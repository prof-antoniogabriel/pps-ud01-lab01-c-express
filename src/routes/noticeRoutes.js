import { Router } from 'express';
import { create, detail, list } from '../controllers/noticeController.js';

const router = Router();
router.get('/', list);
router.get('/:id', detail);
router.post('/', create);

export default router;
