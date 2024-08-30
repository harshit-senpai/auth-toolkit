import { UserInfo } from "@/components/userInfo";
import { currentUser } from "@/lib/auth";

export const ServerPage = async () => {
  const user = await currentUser();

  return <UserInfo user={user} label="💻 Server Component" />;
};

export default ServerPage;
