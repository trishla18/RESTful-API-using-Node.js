const express = require("express");
const users = require("./MOCK_DATA.json");
const app = express();
const PORT = 8000;
const fs = require("fs");

app.use(express.urlencoded({ extended: false }));

//Routes
app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.get("/users", (req, res) => {
  const html = `<ul>
  ${users.map((user) => `<li>${user.first_name}</li>`).join(" ")}
  </ul>
  `;
  res.send(html);
});

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success", id: users.length });
  });
});

app
  .route("/api/users/id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id == id);
    return res.json(user);
  })
  .patch((req, res) => {
    // edit user with id
    return res.json({ status: "pending" });
  })
  .delete((req, res) => {
    //delete user with id
    return res.json({ status: "pending" });
  });

app.listen(PORT, () => {
  console.log(`Server started at PORt ${PORT}`);
});
