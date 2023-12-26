'use server'

import {z} from 'zod'
import { sql } from '@vercel/postgres'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { PasswordMismatchError, UserExistsError } from './customErrors'
import bcrypt from 'bcrypt';
import prisma from './prisma'
const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({invalid_type_error:'Please select a customer.'}),
    amount: z.coerce.number().gt(0, {message:'Please enter an amount greater than 0.'}),
    status: z.enum(['pending','paid'],{invalid_type_error:'Please select an invoice status.'}),
    date: z.string()
}) 

const CreateInvoice = FormSchema.omit({id:true,date:true})

export type State = {
  errors?:{
    customerId?:string[];
    amount?:string[];
    status?:string[];
  };
  message?:string|null;
}

export default async function createInvoice(prevState:State, formData: FormData) {
    const rawFormData = {
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    }

    const validatedFields = CreateInvoice.safeParse(rawFormData)
    console.log(validatedFields)
    if (!validatedFields.success){
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message:'Missing fields. Failed to create invoice.'
      }
    }

    const {customerId, amount, status }= validatedFields.data
    const amountInCents = amount*100
    const date = new Date().toISOString().split('T')[0]

    try{

      await sql `
          INSERT INTO invoices (customer_id, amount, status, date)
          VALUES (${customerId},${amountInCents},${status},${date})
      `
    } catch(error){
      return {
        message:'Database Error. Failed to create invoice.'
      }
    }
    // Clears client router cache for this route and triggers a new call to the server
    revalidatePath('/dashboard/invoices')
    redirect('/dashboard/invoices')
}

const UpdateInvoice = FormSchema.omit({ id: true, date: true });


export async function updateInvoice(id:string, prevState:State, formData:FormData) {
  const validatedFields = UpdateInvoice.safeParse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
  });

  if (!validatedFields.success){
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      
      message:'Missing fields. Failed to update invoice.'
    }
  }

  const { customerId, amount, status } = validatedFields.data

  const amountInCents = amount * 100;

  try {
    await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
    `;
  } catch(error){
    return {
      message: 'Database error. Failed to update invoice.'
    }
  }
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id:string){
  await sql `
   DELETE FROM invoices WHERE id = ${id}     
  `
  revalidatePath('/dashboard/invoices/')
}

import { signIn } from '@/auth'
import { AuthError } from 'next-auth'
export async function authenticate(
  prevState: string|undefined,
  formData: FormData
){
  try{
    await signIn('credentials', formData);
  } catch(error){
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


export async function register(
  prevState: string|undefined,
  formData: FormData
){
  try{

    const name = formData.get('name')?.toString()!
    const email = formData.get('email')?.toString()!
    const password = formData.get('password')?.toString()!
    const confirmPassword = formData.get('confirmPassword')?.toString()!
    // Check if passwords match
    if (password!==confirmPassword) {
      let error = new PasswordMismatchError()
      return error.message
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: {
        email:email
      }
    })
    if (user){
      let error = new UserExistsError()
      return error.message
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const response = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: hashedPassword
      },
    }) 
    console.log(response)
    redirect('/login')
    return {
      status: 'success',
      message: `Successfully created a user for the email: ${email}.`
    }

  } catch(error){
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