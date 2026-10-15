import { createNotice, getNotice, listNotices } from '../services/noticeService.js';

const severities = new Set(['low', 'medium', 'high']);

export function list(req, res) {
  res.json(listNotices());
}

export function detail(req, res) {
  const id = Number(req.params.id);
  if (!Number.isSafeInteger(id) || id < 1) {
    return res.status(400).json({ error: 'El identificador debe ser un entero positivo' });
  }
  const notice = getNotice(id);
  if (!notice) return res.status(404).json({ error: 'Aviso no encontrado' });
  return res.json(notice);
}

export function create(req, res) {
  const { title, severity } = req.body ?? {};
  if (typeof title !== 'string' || title.trim().length === 0 ||
      title.length > 120 || !severities.has(severity)) {
    return res.status(400).json({ error: 'Título o gravedad no válidos' });
  }
  return res.status(201).json(createNotice({ title: title.trim(), severity }));
}
