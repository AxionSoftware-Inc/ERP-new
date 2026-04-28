import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="login-page">
      <section className="login-panel">
        <div>
          <p className="eyebrow">Klinika ERP</p>
          <h1>Tizimga kirish</h1>
          <span>Rolga qarab navigatsiya va sahifalar avtomatik cheklanadi.</span>
        </div>

        <form className="login-form">
          <label>
            Login
            <input placeholder="admin" type="text" />
          </label>
          <label>
            Parol
            <input placeholder="********" type="password" />
          </label>
          <Link className="primary-button" href="/dashboard">
            Kirish
          </Link>
        </form>
      </section>
    </main>
  );
}
