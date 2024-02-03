'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { PasswordMismatchError, UserExistsError } from './customErrors';
import bcrypt from 'bcrypt';
import prisma from './prisma';
import moment from 'moment';

// enum accreditation_type {
//   certificate = 'certificate',
//   testimonial = 'testimonial',
//   review = 'review',
//   attest = 'attest',
// }

// const accredCreate: Prisma.Acc
const FormSchema = z.object({
  name: z.string({ required_error: 'Please enter a name.' }),
  description: z.string().optional(),
  // type: ,
  type: z.enum(['certificate', 'testimonial', 'attest', 'review']),
  validFrom: z.string(),
  validUntil: z.string().optional(),
});

const CreateAccreditation = FormSchema;

// export type State = {
//   errors?:{
//     customerId?:string[];
//     amount?:string[];
//     status?:string[];
//   };
//   message?:string|null;
// }

import { auth } from '@/auth';

export default async function createAccreditation(prevState, formData) {
  const token = await auth();
  const idUser = token?.user?.id;

  const rawFormData = {
    name: formData.get('accreditation'),
    description: formData.get('description'),
    type: formData.get('accreditationType'),
    validFrom: formData.get('valid_from'),
    validUntil: formData.get('valid_until'),
  };
  console.log('RAW FORM DATA');
  console.log(rawFormData);

  // TODO: requires form validation

  const validatedFields = CreateAccreditation.safeParse(rawFormData);
  console.log('VALIDATED FIELDS');
  console.log(validatedFields);
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to create accreditation.',
    };
  }

  const { name, description, type, validFrom, validUntil } =
    validatedFields.data;
  console.log(validFrom);
  console.log(validUntil);
  const date = moment(validFrom, 'DD/MM/YYYY', true).format();
  console.log(date);
  try {
    console.log('HERE');
    const accreditation = await prisma.accreditation.create({
      data: {
        name: name,
        description: description,
        type: type,
        valid_on: moment(validFrom, 'DD/MM/YYYY', true).format(),
        valid_until: validUntil
          ? moment(validUntil, 'DD/MM/YYYY', true).format()
          : null,
        owner_id: idUser,
        creator_id: idUser,
      },
    });

    console.log(accreditation);
  } catch (error) {
    console.log(error);
    return {
      message: 'Database Error. Failed to create accreditation.',
    };
  }
  // Clears client router cache for this route and triggers a new call to the server
  revalidatePath('/dashboard/accreditations');
  redirect('/dashboard/accreditations');
}

const TransactionFormSchema = z.object({
  accreditation_id: z.string({
    required_error: 'Please select an accreditation.',
  }),
  to_id: z.string({ required_error: 'Please select an user to transact to.' }),
});

export async function createTransaction(prevState, formData) {
  // Need to get the data
  // Need to ensure that the accreditation is not being transacted yet
  const token = await auth();
  const idUser = token?.user?.id;
  console.log(formData);
  const rawFormData = {
    accreditation_id: formData.get('accreditation'),
    to_id: formData.get('userTo'),
  };
  console.log('RAW FORM DATA');
  console.log(rawFormData);

  // // TODO: requires form validation

  const validatedFields = TransactionFormSchema.safeParse(rawFormData);
  console.log('VALIDATED FIELDS');
  console.log(validatedFields);
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to create accreditation.',
    };
  }

  const { accreditation_id, to_id } = validatedFields.data;
  try {
    console.log('HERE');

    // create transaction (status completed)
    const result_create = await prisma.transaction.create({
      data: {
        accreditation_id: accreditation_id,
        status: 'completed',
        to_id: to_id,
        from_id: idUser,
      },
    });

    // change last transaction status and owner in accreditation
    const result_change = await prisma.accreditation.update({
      where: { id: accreditation_id },
      data: {
        last_transaction_status: 'completed',
        owner_id: to_id,
      },
    });
    // const accreditation = await prisma.transaction.create({
    //   data: {
    //     name: name,
    //     description: description,
    //     type: type,
    //     valid_on: moment(validFrom, "DD/MM/YYYY", true).format(),
    //     valid_until: validUntil?moment(validUntil, "DD/MM/YYYY", true).format():null,
    //     owner_id: idUser,
    //     creator_id: idUser,

    //   }
    // })

    // console.log(accreditation)
  } catch (error) {
    console.log(error);
    return {
      message: 'Database Error. Failed to create transaction.',
    };
  }
  // Clears client router cache for this route and triggers a new call to the server
  revalidatePath('/dashboard/transactions');
  redirect('/dashboard/transactions');
}

const UpdateAccreditation = FormSchema;

export async function updateAccreditation(id, prevState, formData) {
  const validatedFields = UpdateAccreditation.safeParse({
    name: formData.get('accreditation'),
    description: formData.get('description'),
    type: formData.get('accreditationType'),
    validFrom: formData.get('valid_from'),
    validUntil: formData.get('valid_until'),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,

      message: 'Missing fields. Failed to update accreditation.',
    };
  }

  const { name, description, type, validFrom, validUntil } =
    validatedFields.data;

  try {
    const result = await prisma.accreditation.update({
      where: { id: id },
      data: {
        name: name,
        description: description,
        type: type,
        valid_on: moment(validFrom, 'DD/MM/YYYY', true).format(),
        valid_until: validUntil
          ? moment(validUntil, 'DD/MM/YYYY', true).format()
          : null,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      message: 'Database error. Failed to update accreditation.',
    };
  }

  revalidatePath('/dashboard/accreditations');
  redirect('/dashboard/accreditations');
}

export async function deleteAccreditation(id) {
  const result = await prisma.accreditation.delete({
    where: { id: id },
  });

  revalidatePath('/dashboard/accreditations/');
}
export async function transactAccreditation(id) {
  // const result = await prisma.accreditation.delete({
  //   where: {id:id}
  // })

  revalidatePath('/dashboard/accreditations/');
  redirect('/dashboard/transactions/create');
}

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { Prisma } from '@prisma/client';
export async function authenticate(prevState, formData) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function register(prevState, formData) {
  try {
    const name = formData.get('name')?.toString();
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();
    const confirmPassword = formData.get('confirmPassword')?.toString();
    // Check if passwords match
    if (password !== confirmPassword) {
      let error = new PasswordMismatchError();
      return error.message;
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      let error = new UserExistsError();
      return error.message;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const response = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: hashedPassword,
      },
    });
    console.log(response);
    redirect('/login');
    return `Successfully created a user for the email: ${email}.`;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
