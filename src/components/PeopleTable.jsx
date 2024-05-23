import { Link } from "react-router-dom";
import {
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";

import { addPersonToTable, deletePersonFromTable, updatePersonInTable } from "@/functions";



export default function PeopleTable() {
  const [people, setPeople] = useState([]);

  const fetchPeople = async () => {
    const { data, error } = await supabase.from("people").select();
  
    if (error) {
      console.error("Error fetching people:", error);
      return;
    }
  
    setPeople(data);
  };

  function handleDeletePerson(id) {
    deletePersonFromTable(id)
    .then((data) => {
        console.log('Person deleted successfully:', data);
        // Optionally, you can clear the form fields here or fetch the updated list of people
        //fetchPeople();
        setPeople(prevPeople => prevPeople.filter(p => p.id !== id));
    })
    .catch((error) => {
      console.error('Error deleting person:', error);
    });
  }

  function TableHeaderExample() {
    return (
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="hidden md:table-cell">Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="hidden md:table-cell">Security Method</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
    );
  }
  
  function TableRowExample({
    person = {
      name: "John Deez",
      email: "john.deez@gmail.com",
      role: "Guest",
      security_method: "passcode",
      passcode: 1234,
    },
  }) {

    const [personName, setPersonName] = useState(person.name);
    const [personEmail, setPersonEmail] = useState(person.email);
    const [personRole, setPersonRole] = useState(person.role);
    const [personSecurityMethod, setPersonSecurityMethod] = useState(person.security_method);
    const [personPasscode, setPersonPasscode] = useState(person.passcode);

    function handleUpdatePerson(id) {
      const controlledPasscode = personPasscode!="" ? personPasscode : null;
      if (personName && personEmail && personRole && personSecurityMethod) {
        updatePersonInTable(id, personName, personEmail, personRole, personSecurityMethod, controlledPasscode)
          .then((data) => {
              console.log('Person updated successfully:', data);
              // Optionally, you can clear the form fields here or fetch the updated list of people
              setPersonName('');
              setPersonEmail('');
              setPersonRole('');
              setPersonSecurityMethod('');
              setPersonPasscode();
              // Fetch updated list of people to reflect the newly added person
              fetchPeople();

          })
          .catch((error) => {
            console.error('Error updating person:', error);
          });
      } else {
        alert('Please fill all the fields.');
      }
    }
  
    return (
      <TableRow>
        <TableCell className="font-medium">{person.name}</TableCell>
        <TableCell className="hidden md:table-cell">{person.email}</TableCell>
        <TableCell>
          <Badge variant="outline">{person.role}</Badge>
        </TableCell>
        <TableCell className="hidden md:table-cell">
          {person.security_method}
        </TableCell>
        <TableCell>
          <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DialogTrigger asChild>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuItem onClick={() => console.log("Requested to delete")}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Person</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={personName}
                        onChange={(e) => setPersonName(e.target.value)}
                        placeholder="Pedro Duarte"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input
                        id="email"
                        value={personEmail}
                        onChange={(e) => setPersonEmail(e.target.value)}
                        placeholder="pedro@peduarte.com"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="role" className="text-right">
                        Role
                      </Label>
                      <Select id="role" className="w-full" value={personRole} onValueChange={(value) => setPersonRole(value)}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Role</SelectLabel>
                            <SelectItem value="guest">Guest</SelectItem>
                            <SelectItem value="cleaner">Cleaner</SelectItem>
                            <SelectItem value="gardener">Gardener</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="security_method" className="text-right">
                        Security Method
                      </Label>
                      <Select id="security_method" className="w-full" value={personSecurityMethod} onValueChange={(value) => setPersonSecurityMethod(value)}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select a security method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Security Method</SelectLabel>
                            <SelectItem value="passcode">Passcode</SelectItem>
                            <SelectItem value="one-time">
                              One-Time Code
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    {personSecurityMethod==='passcode' &&
                    <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="passcode" className="text-right">
                        Passcode
                      </Label>
                      <Input
                        id="passcode"
                        value={personPasscode}
                        onChange={(e) => setPersonPasscode(e.target.value)}
                        placeholder="1234"
                        className="col-span-3"
                      />
                  </div>}
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={() => console.log("Requested to update")}>Update Person</Button>
                  </DialogFooter>
                </DialogContent>
          </Dialog>
        </TableCell>
      </TableRow>
    );
  }
  
  function NewPerson({}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [securityMethod, setSecurityMethod] = useState("");
    const [passcode, setPasscode] = useState();
  
    function handleAddPerson() {
      const controlledPasscode = passcode!="" ? passcode : null;
      if (name && email && role && securityMethod) {
        addPersonToTable(name, email, role, securityMethod, controlledPasscode)
          .then((data) => {
              console.log('Person added successfully:', data);
              /* setPeople(prevPeople => [...prevPeople, {name, email, role, security_method: securityMethod, passphrase: controlledPassphrase}]); */
              // Optionally, you can clear the form fields here or fetch the updated list of people
              setName('');
              setEmail('');
              setRole('');
              setSecurityMethod('');
              setPasscode();
              // Fetch updated list of people to reflect the newly added person
              fetchPeople();

          })
          .catch((error) => {
            console.error('Error adding person:', error);
          });
      } else {
        alert('Please fill all the fields.');
      }
    }
  
    return (
      <div className="ml-auto flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Add Person
                    </span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Person</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Pedro Duarte"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="pedro@peduarte.com"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="role" className="text-right">
                        Role
                      </Label>
                      <Select id="role" className="w-full" value={role} onValueChange={(value) => setRole(value)}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Role</SelectLabel>
                            <SelectItem value="guest">Guest</SelectItem>
                            <SelectItem value="cleaner">Cleaner</SelectItem>
                            <SelectItem value="gardener">Gardener</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="security_method" className="text-right">
                        Security Method
                      </Label>
                      <Select id="security_method" className="w-full" value={securityMethod} onValueChange={(value) => setSecurityMethod(value)}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select a security method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Security Method</SelectLabel>
                            <SelectItem value="passcode">Passcode</SelectItem>
                            <SelectItem value="one-time">
                              One-Time Code
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    {securityMethod==='passcode' &&
                    <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="passcode" className="text-right">
                        Passcode
                      </Label>
                      <Input
                        id="passcode"
                        value={passcode}
                        onChange={(e) => setPasscode(e.target.value)}
                        placeholder="1234"
                        className="col-span-3"
                      />
                  </div>}
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleAddPerson}>Add Person</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
    )
  }

  function EditPerson({person}) {
    const [name, setName] = useState(person.name);
    const [email, setEmail] = useState(person.email);
    const [role, setRole] = useState(person.role);
    const [securityMethod, setSecurityMethod] = useState(person.security_method);
    const [passcode, setPasscode] = useState(person.passcode);
  
    function handleUpdatePerson(id) {
      const controlledPasscode = passcode!="" ? passcode : null;
      if (name && email && role && securityMethod) {
        updatePersonInTable(id, name, email, role, securityMethod, controlledPasscode)
          .then((data) => {
              console.log('Person updated successfully:', data);
              /* setPeople(prevPeople => [...prevPeople, {name, email, role, security_method: securityMethod, passphrase: controlledPassphrase}]); */
              // Optionally, you can clear the form fields here or fetch the updated list of people
              setName('');
              setEmail('');
              setRole('');
              setSecurityMethod('');
              setPasscode();
              // Fetch updated list of people to reflect the newly added person
              fetchPeople();

          })
          .catch((error) => {
            console.error('Error adding person:', error);
          });
      } else {
        alert('Please fill all the fields.');
      }
    }
  
    return (
      <div className="ml-auto flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Add Person
                    </span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Person</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Pedro Duarte"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="pedro@peduarte.com"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="role" className="text-right">
                        Role
                      </Label>
                      <Select id="role" className="w-full" value={role} onValueChange={(value) => setRole(value)}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Role</SelectLabel>
                            <SelectItem value="guest">Guest</SelectItem>
                            <SelectItem value="cleaner">Cleaner</SelectItem>
                            <SelectItem value="gardener">Gardener</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="security_method" className="text-right">
                        Security Method
                      </Label>
                      <Select id="security_method" className="w-full" value={securityMethod} onValueChange={(value) => setSecurityMethod(value)}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select a security method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Security Method</SelectLabel>
                            <SelectItem value="passcode">Passcode</SelectItem>
                            <SelectItem value="one-time">
                              One-Time Code
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    {securityMethod==='passcode' &&
                    <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="passcode" className="text-right">
                        Passcode
                      </Label>
                      <Input
                        id="passcode"
                        value={passcode}
                        onChange={(e) => setPasscode(e.target.value)}
                        placeholder="1234"
                        className="col-span-3"
                      />
                  </div>}
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={() => handleUpdatePerson(person.id)}>Update Person</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
    )
  }
  
  useEffect(() => {
    fetchPeople();
  }, []);
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="guests">Guests</TabsTrigger>
            <TabsTrigger value="staff">Staff</TabsTrigger>
          </TabsList>
          <NewPerson fetchPeople={fetchPeople} />
        </div>
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>People</CardTitle>
              <CardDescription>
                Manage your people and their permissions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeaderExample />
                <TableBody>
                  {people.map((person) => (
                    <TableRowExample key={person.id} person={person} />
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
             {/*  <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>32</strong> products
              </div> */}
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="guests">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>People</CardTitle>
              <CardDescription>
                Manage your people and their permissions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeaderExample />
                <TableBody>
                  {people.filter(person => person.role === 'guest').map((person) => (
                    <TableRowExample key={person.id} person={person} />
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
             {/*  <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>32</strong> products
              </div> */}
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="staff">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>People</CardTitle>
              <CardDescription>
                Manage your people and their permissions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeaderExample />
                <TableBody>
                  {people.filter(person => person.role === 'cleaner' || person.role === 'gardener').map((person) => (
                    <TableRowExample key={person.id} person={person} />
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
             {/*  <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>32</strong> products
              </div> */}
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
