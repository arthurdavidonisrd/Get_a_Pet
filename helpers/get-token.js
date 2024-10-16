const getToken = (req) => {
    const authHeader = req.headers.authorization;
    
    // Verifica se o cabeçalho de autorização existe e está no formato correto
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      return token;
    }
  
    // Retorna null se o cabeçalho não for encontrado ou estiver malformado
    return null;
  }
  
  module.exports = getToken;
  