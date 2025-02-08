import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

type LogoutButtonProps = {
  className?: string;
};

export default function LogoutButton({ className }: LogoutButtonProps) {
  const handleLogout = () => {
    toast.success("Logging out...", {
      onClose: () => {
        signOut({ callbackUrl: "/" });
      },
    });
  };

  return (
    <button onClick={handleLogout} className={className}>
      Logout
    </button>
  );
}
