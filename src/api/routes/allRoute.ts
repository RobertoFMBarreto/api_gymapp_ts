import express from "express";

import { CriarPostsController } from "../controllers/all/posts/criarPostsController";
import { RemoverPostController } from "../controllers/all/posts/removerPostController";
import { VerTodosPostsController } from "../controllers/all/posts/obter/verTodosPostsController";
import { VerTodosPostsUserController } from "../controllers/all/posts/obter/verTodosPostsUserController";
import { VerInfoPostController } from "../controllers/all/posts/obter/verInfoPostController";
import { EditarPublicacaoController } from "../controllers/all/posts/editarPublicacaoController";
import { UpdateEstadoNotificacaoController } from "../controllers/all/notificacoes/updateEstadoNotificacaoController";
import { CriarGostoController } from "../controllers/all/gostosPosts/criarGostoController";

const allRouter = express.Router();


const criarPostsController = new CriarPostsController();
const verTodosPostsController = new VerTodosPostsController();
const removerPostsController = new RemoverPostController();
const verTodosPostsUserController = new VerTodosPostsUserController();
const verInfoPostInfoController = new VerInfoPostController();
const editarPublicacaoController  = new EditarPublicacaoController();
const updateEstadoNotificacaoController = new UpdateEstadoNotificacaoController();
const criarGostoController=new CriarGostoController();



//#region Publicacoes
allRouter.post("/posts", criarPostsController.handle);
allRouter.get("/posts/all/:id", verTodosPostsController.handle);
allRouter.get("/posts/user/:id", verTodosPostsUserController.handle)
allRouter.put("/posts", editarPublicacaoController.handle);
allRouter.get("/posts/:id", verInfoPostInfoController.handle)
allRouter.post("/posts/:id/gostos", criarGostoController.handle)

//ver info de post



// adminRouter.put("/posts/:id", editarPublicacaoController.handle);
allRouter.delete("/posts/:id", removerPostsController.handle);
// adminRouter.post("/posts/:id/gostos", criarGostoController.handle);
//#endregion


//#region Notificacoes
allRouter.put("/notificacao/", updateEstadoNotificacaoController.handle);
//#endregion
export { allRouter };