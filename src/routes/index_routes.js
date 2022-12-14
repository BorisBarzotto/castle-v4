import { Router } from "express";
//import fetch from 'node-fetch';
//import Mercancia from "../models/mercancia.js";
import mercancias from "../public/db/mercancias.js";
import tiendasUbicacion from '../public/db/shops.js';


const router = Router();

router.get("/", async (req,res)=>{
  //const mercancias = await Mercancia.find().lean();
  const ciudades = tiendasUbicacion.map(tienda=>{
    return tienda.ciudad
  }).sort();

  const listaCiudades = new Set(ciudades);

  res.render('home', { mercancias, listaCiudades} );
});

router.get("/about", (req,res)=>{
  res.render('about');
});

router.get("/news", (req,res)=>{
  res.render('news');
});
/*
router.post("/add", async (req, res) => {
  try {
    console.log(req.body);
    const mercancia = Mercancia(req.body);
    const taskSaved = await mercancia.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
}
);*/
/*
import {
  renderTasks,
  createTask,
  renderEdit,
  updateTask,
  deleteTask,
  toggleTask,
} from "../controller/task.controller.js";



router.get("/about", (req, res) => {
  res.render("about");
});

router.post("/task/add", createTask);

router.get("/task/:id/toggleDone", toggleTask);

router.get("/task/:id/edit", renderEdit);

router.post("/task/:id/edit", updateTask);

router.get("/task/:id/delete", deleteTask);
*/
export default router;