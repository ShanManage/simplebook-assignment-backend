class User {
  constructor(id, email, firstName, lastName, phone, address) {
    (this.id = id),
    (this.email = email),
    (this.firstName = firstName),
    (this.lastName = lastName),
    (this.phone = phone),
    (this.address = address);
  }
}

export default User;