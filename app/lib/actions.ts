'use server'
import * as z from 'zod'
import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.number(),
  status: z.string(),
  date: z.string(),
})

const CreateInvoice = FormSchema.omit({ id: true, date: true })
const UpdateInvoice = FormSchema.omit({ id: true, date: true })

export const createInvoice = async (data: FormData) => {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: data.get('customerId'),
    amount: Number(data.get('amount')),
    status: data.get('status')
  })

  const amountInCents = amount * 100
  const date = new Date().toISOString().split('T')[0]

  try {
    await sql`INSERT INTO invoices (customer_id, amount, status, date) VALUES (${customerId}, ${amountInCents}, ${status}, ${date})`;
    revalidatePath('/dashboard/invoices') 
  } catch (reason) {
    return { message: 'Failed to create invoice' }
  }
  redirect('/dashboard/invoices')
}

export const updatedInvoice = async (id: string, data: FormData) => {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: data.get('customerId'),
    amount: Number(data.get('amount')),
    status: data.get('status')
  })

  const amountInCents = amount * 100
  const date = new Date().toISOString().split('T')[0]

  try {
    await sql`UPDATE invoices SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}, date = ${date} WHERE id = ${id}`
    revalidatePath('/dashboard/invoices') 
  } catch (reason) {
    return { message: 'Failed to update invoice' }
  }
  redirect('/dashboard/invoices')
}

export const deletedInvoice = async (id: string) => {

  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`
    revalidatePath('/dashboard/invoices')
  } catch (reason) {
    return { message: 'Failed to delete invoice' }
  }
}