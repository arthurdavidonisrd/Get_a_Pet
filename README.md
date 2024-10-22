A API Get a Pet é voltada para a adoção de animais e foi desenvolvida com o intuito de facilitar o processo de adoção, conectando pessoas que desejam adotar animais com os pets disponíveis. A arquitetura utilizada segue o padrão MVC (Model-View-Controller), implementada em Node.js com Express, e possui endpoints para gerenciar tanto os usuários quanto os pets.

Principais funcionalidades da API:
Gerenciamento de Pets:

Cadastro de Pets: Usuários podem cadastrar um novo pet para adoção, incluindo informações como nome, idade, raça, descrição e imagens.
Listagem de Pets: Todos os pets disponíveis para adoção podem ser listados através de um endpoint, permitindo também filtros como espécie, idade, entre outros.
Detalhes de um Pet: Um pet específico pode ser consultado com detalhes, como histórico, vacinas e informações adicionais fornecidas pelo usuário que o cadastrou.
Atualização de Pets: Usuários que cadastraram o pet podem atualizar as informações dele, como adicionar novos dados ou imagens.
Exclusão de Pets: O pet pode ser removido da listagem caso seja adotado ou não esteja mais disponível.
Gerenciamento de Usuários:

Cadastro de Usuários: Usuários podem se cadastrar na plataforma, fornecendo seus dados pessoais, como nome, e-mail e senha. Cada usuário tem um perfil onde pode gerenciar os pets que cadastrou.
Autenticação de Usuários: Implementada com autenticação via JWT (JSON Web Token), garantindo que apenas usuários autenticados possam realizar ações restritas, como cadastrar, editar ou excluir pets.
Atualização de Perfil: Usuários podem atualizar suas informações pessoais, como e-mail ou senha.
Exclusão de Conta: A API permite que o usuário exclua sua conta, removendo seu perfil e os pets associados.
Adoção de Pets:

Solicitação de Adoção: Usuários interessados em um pet podem enviar uma solicitação de adoção, que será vinculada ao pet e ao usuário que o cadastrou.
Gerenciamento de Solicitações: O dono do pet pode gerenciar as solicitações de adoção, aceitando ou rejeitando as ofertas de potenciais adotantes.
Histórico de Adoção: A API mantém um histórico de pets adotados, permitindo rastrear quais animais foram adotados e por quem.
Stack e Tecnologias Utilizadas:
Node.js com Express: para construir o back-end e criar os endpoints.
Sequelize: ORM para gerenciar a comunicação com o banco de dados (provavelmente MySQL ou PostgreSQL).
JWT: para autenticação e autorização de usuários.
Multer: para upload e gerenciamento de imagens dos pets.
Bcrypt: para criptografia de senhas dos usuários.
Estrutura de Endpoints (exemplo):
POST /pets: Cadastrar um novo pet.
GET /pets: Listar todos os pets disponíveis.
GET /pets/:id: Obter detalhes de um pet específico.
PUT /pets/:id: Atualizar informações de um pet.
DELETE /pets/:id: Remover um pet.
POST /users: Registrar um novo usuário.
POST /login: Autenticar um usuário.
POST /adopt/:petId: Enviar uma solicitação de adoção.
Essa API facilita tanto para quem deseja adotar um animal quanto para quem precisa colocar um pet para adoção, tornando o processo mais organizado e seguro.
