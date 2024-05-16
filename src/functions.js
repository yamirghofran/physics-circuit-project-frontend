import { supabase } from "./utils/supabase";
import { Resend } from 'resend';

const resend = new Resend('re_F1zG1Cre_AvGjLLHomM6P4puVpS5MvEqP');

async function sendEmail(email, subject, text) {
  const { data, error } = await resend.emails.send({
    from: 'Heisenburgers <hello@bestphysicsproject.com>',
    to: email,
    subject: subject,
    html: `<p>${text}</p>`,
  });

  if (error) {
    console.error({ error });
    return;
  }

  console.log({ data });
}

export async function addPersonToTable(name, email, role, security_method, passcode) {
  const { data, error } = await supabase
    .from('people')
    .insert([
      { name, email, role, security_method, passcode }
    ]);

  if (error) {
    console.error('Error adding person:', error);
    return null;
  }

  sendEmail(email, 'Welcome to Heisenburgers!', `You have been added to the Heisenburgers residence as a ${role}.`);
  return data;
}

export async function deletePersonFromTable(id) {
  const { data, error } = await supabase
    .from('people')
    .delete()
    .match({ id });

  if (error) {
    console.error('Error deleting person:', error);
    return null;
  }
  return data;
}

export async function updatePersonInTable(id, name, email, role, security_method, passcode) {
  const { data, error } = await supabase
    .from('people')
    .update({ name, email, role, security_method, passcode })
    .match({ id });

  if (error) {
    console.error('Error updating person:', error);
    return null;
  }
  return data;
}

