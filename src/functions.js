import { supabase } from "./utils/supabase";

export async function addPersonToTable(name, email, role, security_method, passphrase) {
  const { data, error } = await supabase
    .from('people')
    .insert([
      { name, email, role, security_method, passphrase }
    ]);

  if (error) {
    console.error('Error adding person:', error);
    return null;
  }
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

export async function updatePersonInTable(id, name, email, role, security_method) {
  const { data, error } = await supabase
    .from('people')
    .update({ name, email, role, security_method })
    .match({ id });

  if (error) {
    console.error('Error updating person:', error);
    return null;
  }
  return data;
}

