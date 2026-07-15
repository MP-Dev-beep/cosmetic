import { useAuth } from "../auth/AuthProvider";

function Profile() {
  const { user } = useAuth();

  return (
    <div className="container mt-4">
      <h3>Mon profil</h3>

      <p><strong>Nom :</strong> {user?.username}</p>
      <p><strong>Email :</strong> {user?.email}</p>
      <p><strong>Rôle :</strong> {user?.role}</p>
    </div>
  );
}

export default Profile;