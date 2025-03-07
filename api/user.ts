import express, { query } from "express";
import { conn } from "../dbconnect";


// router = ตัวจัดการเส้นทาง
export const router = express.Router();

router.use(express.json());

router.use(express.urlencoded({ extended: true }));

// โชว์หมด
router.get("/", (req, res)=>{
    if (req.query.id) {
        const id = req.query.id;
        const name = req.query.name;
        res.send("Method GET in user.ts with" + id);
    }else{
      const sql = 'select * from user';
      conn.query(sql, (err,result)=>{
        if (err) {
            res.status(400).json(err);
        } else {
            res.json(result);
        }
      })
    }
});

// /user/
router.get("/:id", (req, res)=>{
    const id = req.params.id;
    //bad
    // const sql = "select * from user where uid = "+ id;
    // good
    const sql = "select * from user where uid = ?";

    conn.query(sql, [id], (err,result)=>{
        if (err) {
            res.status(400).json(err);
        } else {
            res.json(result);
        }
      })
    // res.send("Method GET in user.ts" + id);
});

router.post("/add", (req, res) => {
    let details = {
      user: req.body.user,
      email: req.body.email,
      password: req.body.password,
      profile: req.body.profile,
    };
    let sql = "INSERT INTO user SET ?";
    conn.query(sql, details, (error) => {
      if (error) {
        res.send({ status: false, message: "Student created Failed" });
      } else {
        res.send({ status: true, message: "Student created successfully" });
      }
    });
  });

  router.post("/check", (req, res) => {
    let details = {
        email: req.body.email,
        password: req.body.password,
    };
    const sql = "SELECT * FROM user WHERE email = ? AND password = ?";

    conn.query(sql, [details.email, details.password], (err, result) => {
        if (err) {
            res.status(400).json({ status: false, message: "Login Failed", error: err });
        } else {
            res.json(result);
        }
    });
});

// // POST /user
// router.post("/", (req, res)=>{
//     let body = req.body; 
//     res.send("Get in user.ts body: " + JSON.stringify(body));

// });

// router.get("/search/fields", (req, res)=>{
//     const id = req.query.id;
//     // conts name = req,query.name;
//     const sql = "select * from user where "+" (idx IS NULL OR idx = ?) OR (name IS NULL OR name like ?)";
//     conn.query(sql, [id, "s", name, "s"], (err, result)=>{
//         if (err) {
//             res.json(err);
//         } else {
//             res.json(result);
//         }
//     })
// });

// router.get("/search/mon", (req, res)=>{
//     const id =req.query.id;
//     const price = req.query.price;
//     const sql = "select * from user where "+" (idx IS NULL OR idx = ?) OR (name IS NULL OR name like ?)";
//     conn.query(sql, [id, "s", name, "s",price], (err, result)=>{
//         if (err) {
//             res.json(err);
//         } else {
//             res.json(result);
//         }
//     })
// });
