const notices = [
  { id: 1, title: 'Revisar registros del servidor', severity: 'medium' },
  { id: 2, title: 'Actualizar dependencia vulnerable', severity: 'high' },
];
let nextId = 3;

export function listNotices() {
  return notices.map((notice) => ({ ...notice }));
}

export function getNotice(id) {
  const notice = notices.find((item) => item.id === id);
  return notice ? { ...notice } : null;
}

export function createNotice({ title, severity }) {
  const notice = { id: nextId++, title, severity };
  notices.push(notice);
  return { ...notice };
}
