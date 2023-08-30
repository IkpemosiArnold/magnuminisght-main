import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default function Profile() {
  return (
    <main className="flex min-h-screen flex-col justify-between p-4">
      <h1>
        <Tabs defaultValue="account" className="h-full space-y-6 mt-4">
          <TabsList>
            <TabsTrigger value="account">Edit Profile</TabsTrigger>
            <TabsTrigger value="password">Change Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </h1>
    </main>
  );
}
