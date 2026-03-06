import {prisma} from '../config/database.js';

export const admin = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Não autenticado' });
  }

  try {

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { isAdmin: true } 
    });

    if (!user || !user.isAdmin) {
      return res.status(403).json({ error: 'Acesso negado: requer administrador' });
    }


    req.user.isAdmin = user.isAdmin;
    next();
  } catch (err) {
    console.error('Erro ao validar admin:', err);
    res.status(500).json({ error: 'Erro interno ao verificar permissões' });
  }
};