import {Router} from "express"
import db from "./database.js"

const router = Router()

router.get("/stickers", (req, res, next) => {
    const sql = "select * from stickers"
    const params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

router.get("/stickers/:id", (req, res, next) => {
    const sql = "select * from stickers where id = ?"
    const params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});

router.post("/sticker/", (req, res, next) => {
    const data = {
        source: req.body.source,
        dateAcquired: req.body.dateAcquired,
        eventAcquired: req.body.eventAcquired,
        amt: req.body.amt,
        imgURL: req.body.imgURL
    }
    const sql ='INSERT INTO stickers (source, dateAcquired, amt, eventAcquired, imgURL) VALUES (?,?,?,?,?)'
    const params =[data.source, data.dateAcquired, data.amt, data.eventAcquired, data.imgURL]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})

router.patch("/api/user/:id", (req, res, next) => {
    const data = {
        source: req.body.source,
        dateAcquired: req.body.dateAcquired,
        eventAcquired: req.body.eventAcquired,
        amt: req.body.amt,
        imgURL: req.body.imgURL
    }
    db.run(
        `UPDATE stickers set
           source = COALESCE(?,source),
           dateAcquired = COALESCE(?,dateAcquired),
           amt = COALESCE(?,amt),
           eventAcquired = COALESCE(?,eventAcquired),
           imgURL = COALESCE(?,imgURL)
           WHERE id = ?`,
           [data.source, data.dateAcquired, data.amt, data.eventAcquired, data.imgURL],
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })
    });
})

export default router;