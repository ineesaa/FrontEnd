import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { ProfileForm } from "@/components/profile/profile-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default async function EditProfilePage() {
  const sessionUser = await getCurrentUser();
  if (!sessionUser) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: sessionUser.id },
  });
  if (!user) redirect("/login");

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 sm:px-10">
      <Card>
        <CardHeader>
          <CardTitle>Edit profile</CardTitle>
          <CardDescription>
            Update how other parts of the app greet you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm
            email={user.email}
            defaultValues={{
              name: user.name ?? "",
              country: user.country ?? "",
              bio: user.bio ?? "",
              image: user.image ?? "",
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
