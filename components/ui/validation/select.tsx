'use server';
import { lusitana } from '../fonts';
import { fetchUsers } from '@/app/lib/data';
import Select from 'react-select';

export function UserSelect() {
  const users = fetchUsers();
  console.log(users);
  // users.map((user)=>{
  // const temp
  // })
  console.log(users);
  return [];
}
