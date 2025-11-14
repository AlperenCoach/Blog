import './pages.css';


export default function Signup() {
  return (
    <section className="page">
      <h1>Signup</h1>
      <form className="writeForm" onSubmit={handleSubmit}>
        <label className="writeFieldSignup" htmlFor="username">
            Kullanıcı Adı
            <input type="text" id="username" name="username" placeholder="Kullanıcı Adı" required />
          </label>
          <label className="phoneNumeber" id="name">
            Telefon Numarası
            <input type="text" id="phoneNumber" name="phoneNumber" placeholder="Telefon Numarası" required />
          </label>
        <label className="writeFieldSignup" htmlFor="email">
            Email
            <input type="email" id="email" name="email" placeholder="Email" required />
          </label>
        <label className="writeFieldSignup" htmlFor="password">
            Şifre
            <input type="password" id="password" name="password" placeholder="Şifre" required />
          </label>
        <div className="writeActions">
          <button type="submit">Kayıt Ol</button>
        </div>
      </form>
    </section>
  );
}
