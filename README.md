# API GalaxyNerd

## Regras de Negócio (RNs)

### Administradores

1. **Cadastrar Administrador**
   - [x] Cadastrar um novo administrador com informações como nome, email, senha, avatar, biografia, tópicos de interesse, localização e redes sociais.
   - [x] Evitar o cadastro de um administrador com o mesmo email de outro já existente.

2. **Listar Administradores**
    - [ ] Listar todos os administradores cadastrados.
    - [ ] Listar administradores por tópicos de interesse.
    - [ ] Listar administradores por nome.
    - [ ] Listar administradores por localização.
    - [ ] Listar administradores por data de criação.
    - [ ] Não permitir a listagem de todos os administradores sem autenticação.
    - [ ] Restringir a listagem de todos os administradores apenas a administradores.

3. **Atualizar Administrador**
    - [ ] Atualizar informações de um administrador cadastrado.
    - [ ] Evitar a atualização do email para um já existente.
    - [ ] Permitir a atualização apenas pelo próprio administrador ou administrador.
    - [ ] Não permitir a atualização sem autenticação.

4. **Deletar Administrador**
    - [ ] Deletar um administrador cadastrado.
    - [ ] Permitir a exclusão apenas pelo próprio administrador ou administrador.
    - [ ] Não permitir a exclusão sem autenticação.

5. **Visualizar Administrador**
    - [ ] Visualizar detalhes de um administrador, incluindo nome, email, avatar, biografia, tópicos de interesse, localização e redes sociais.
    - [ ] O administrador só poderá visualizar os seus dados se estiver autenticado.

### Categoria

1. **Cadastrar Categoria**
   - [ ] Cadastrar uma nova categoria com informações como nome e descrição.
   - [ ] Evitar o cadastro de uma categoria com o mesmo nome de outra já existente.
   - [ ] Restringir o cadastro de categoria apenas a administradores.
   - [ ] Não permitir o cadastro de categoria sem autenticação.

2. **Listar Categorias**
   - [ ] Listar todas as categorias cadastradas.
   - [ ] Listar categorias por nome.

### Instrutores

1. **Cadastrar Instrutor**
   - [ ] Cadastrar um novo instrutor com informações como nome, email, senha, avatar, biografia, tópicos de interesse, localização e redes sociais.
   - [ ] Evitar o cadastro de um instrutor com o mesmo email de outro já existente.
   - [ ] Restringir o cadastro de instrutores apenas a administradores.
   - [ ] Não permitir o cadastro de instrutores sem autenticação.


2. **Listar Instrutores**
   - [ ] Listar todos os instrutores cadastrados.
   - [ ] Listar instrutores por tópicos de interesse.
   - [ ] Listar instrutores por nome.
   - [ ] Deve ser possível listar todos os instrutores cadastrados por localização.
   - [ ] Listar instrutores por localização.
   - [ ] Listar instrutores por data de criação.
   - [ ] Listar instrutores apenas para usuários autenticados.
   - [ ] Restringir a listagem de todos os instrutores apenas a administradores.
   - [ ] Não permitir a listagem de todos os instrutores sem ser um administrador.


3. **Atualizar Instrutor**
    - [ ] Atualizar informações de um instrutor cadastrado.
    - [ ] Evitar a atualização do email para um já existente.
    - [ ] Permitir atualização apenas pelo próprio instrutor ou administrador.
    - [ ] Não permitir atualização sem autenticação.


4. **Deletar Instrutor**
    - [ ] Deletar um instrutor cadastrado.
    - [ ] Permitir a exclusão apenas pelo próprio instrutor ou administrador.
    - [ ] Não permitir a exclusão sem autenticação.

### Cursos

1. **Cadastrar Curso**
    - [ ] Cadastrar um novo curso com informações como título, descrição, preço e instrutor já existente.
    - [ ] Evitar o cadastro de um curso com o mesmo título de outro já existente.


2. **Listar Cursos**
    - [ ] Listar todos os cursos cadastrados.
    - [ ] Listar cursos por instrutor.
    - [ ] Listar cursos por tópicos.
    - [ ] Listar cursos por título.
    - [ ] Listar cursos por preço.
    - [ ] Listar cursos por data de criação.


3. **Atualizar Curso**
    - [ ] Atualizar informações de um curso cadastrado.
    - [ ] Evitar a atualização do título para um já existente.
    - [ ] Não permitir a atualização de um curso que não pertence ao instrutor que está tentando atualizar.
    - [ ] Não permitir a atualização de um curso que não existe.


4. **Deletar Curso**
    - [ ] Deletar um curso cadastrado.
    - [ ] Não permitir a exclusão de um curso que não pertence ao instrutor que está tentando deletar.
    - [ ] Não permitir a exclusão de um curso que não existe.

5. **Visualizar Curso**
    - [ ] Visualizar detalhes de um curso, incluindo título, descrição, preço, instrutor, tópicos, aulas.

### Tópicos

1. **Cadastrar Tópico**
   - [ ] Cadastrar um novo tópico com informações como nome e descrição referente a um curso.
   - [ ] Evitar o cadastro de um tópico com o mesmo nome de outro já existente.
   - [ ] Restringir o cadastro de tópicos apenas a instrutores.
    - [ ] Não permitir o cadastro de tópicos sem autenticação.

2. **Listar Tópicos**
    - [ ] Listar todos os tópicos cadastrados.
    - [ ] Listar tópicos por nome.
    - [ ] Listar tópicos por data de criação.
    - [ ] Listar tópicos apenas para usuários autenticados.

3. **Atualizar Tópico**
    - [ ] Atualizar informações de um tópico cadastrado.
    - [ ] Evitar a atualização do nome para um já existente.
    - [ ] Permitir atualização apenas pelo próprio instrutor ou administrador.
    - [ ] Não permitir atualização sem autenticação.

4. **Deletar Tópico**
    - [ ] Deletar um tópico cadastrado.
    - [ ] Permitir a exclusão apenas pelo próprio instrutor ou administrador.
    - [ ] Não permitir a exclusão sem autenticação.

### Documentos

1. **Cadastrar Documento**
   - [ ] Cadastrar um novo documento com informações como título, descrição, arquivo e aula referente a um curso.
   - [ ] Evitar o cadastro de um documento com o mesmo título de outro já existente.
   - [ ] Restringir o cadastro de documentos apenas a instrutores.
   - [ ] Não permitir o cadastro de documentos sem autenticação.

2. **Listar Documentos**
    - [ ] Listar todos os documentos cadastrados.
    - [ ] Listar documentos por título.
    - [ ] Listar documentos por data de criação.
    - [ ] Listar documentos apenas para usuários autenticados.

3. **Atualizar Documento**
    - [ ] Atualizar informações de um documento cadastrado.
    - [ ] Evitar a atualização do título para um já existente.
    - [ ] Permitir atualização apenas pelo próprio instrutor ou administrador.
    - [ ] Não permitir atualização sem autenticação.

4. **Deletar Documento**
    - [ ] Deletar um documento cadastrado.
    - [ ] Permitir a exclusão apenas pelo próprio instrutor ou administrador.
    - [ ] Não permitir a exclusão sem autenticação.

### Estudantes

1. **Cadastrar Estudante**
   - [ ] Cadastrar um novo estudante com informações como nome, email, senha, avatar, biografia, tópicos de interesse, localização e redes sociais.
   - [ ] Evitar o cadastro de um estudante com o mesmo email de outro já existente.

2. **Listar Estudantes**
   - [ ] Listar todos os estudantes cadastrados.
   - [ ] Listar estudantes por tópicos de interesse.
   - [ ] Listar estudantes por nome.
   - [ ] Listar estudantes por localização.
   - [ ] Listar estudantes por data de criação.
   - [ ] Não permitir a listagem de todos os estudantes sem autenticação.
   - [ ] Restringir a listagem de todos os estudantes apenas a administradores.
   - [ ]Listar estudantes por categoria.

3. **Atualizar Estudante**
    - [ ] Atualizar informações de um estudante cadastrado.
    - [ ] Evitar a atualização do email para um já existente.
    - [ ] Permitir a atualização apenas pelo próprio estudante ou administrador.
    - [ ] Não permitir a atualização sem autenticação.

4. **Deletar Estudante**
    - [ ] Deletar um estudante cadastrado.
    - [ ] Permitir a exclusão apenas pelo próprio estudante ou administrador.
    - [ ] Não permitir a exclusão sem autenticação.

5. **Visualizar Estudante**
    - [ ] Visualizar detalhes de um estudante, incluindo nome, email, avatar, biografia, tópicos de interesse, localização e redes sociais.

### Aulas

1. **Cadastrar Aula**
   - [ ] Cadastrar uma nova aula com informações como título, descrição, vídeo, duração, ordem, curso, documentos, links e tópicos.
   - [ ] Evitar o cadastro de uma aula com o mesmo título de outra já existente.
   - [ ] Não permitir o cadastro de uma aula sem autenticação.
   - [ ] Não permitir o cadastro de uma aula sem ser um instrutor.

2. **Listar Aulas**
    - [ ] Listar todas as aulas cadastradas.
    - [ ] Listar aulas por instrutor.
    - [ ] Listar aulas por curso.
    - [ ] Listar aulas por tópicos.
    - [ ] Listar aulas por título.
    - [ ] Listar aulas por ordem.
    - [ ] Listar aulas por data de criação.
    - [ ] Não permitir a listagem de todas as aulas sem autenticação.

3. **Atualizar Aula**
    - [ ] Atualizar informações de uma aula cadastrada.
    - [ ] Evitar a atualização do título para um já existente.
    - [ ] Não permitir a atualização de uma aula que não pertence ao instrutor que está tentando atualizar.
    - [ ] Não permitir a atualização de uma aula que não existe.
    - [ ] Não permitir a atualização de uma aula sem autenticação.
    - [ ] Não permitir a atualização de uma aula sem ser um instrutor.

4. **Deletar Aula**
    - [ ] Deletar uma aula cadastrada.
    - [ ] Não permitir a exclusão de uma aula que não pertence ao instrutor que está tentando deletar.
    - [ ] Não permitir a exclusão de uma aula que não existe.
    - [ ] Não permitir a exclusão de uma aula sem autenticação.
    - [ ] Não permitir a exclusão de uma aula sem ser um instrutor.

5. **Visualizar Aula**
    - [ ]  Visualizar detalhes de uma aula, incluindo título, descrição, vídeo, duração, ordem, curso, documentos, links e tópicos.

### Tarefas

1. **Cadastrar uma Tarefa (Quiz com varias perguntas) referente a Aula**
    - [ ] Cadastrar uma nova tarefa com informações como título, descrição, instrutor, curso, aula, perguntas e respostas.
    - [ ] Evitar o cadastro de uma tarefa com o mesmo título de outra já existente.
    - [ ] Não permitir o cadastro de uma tarefa sem autenticação.
    - [ ] Não permitir o cadastro de uma tarefa sem ser um instrutor.

2. **Listar Tarefas**
    - [ ] Listar todas as tarefas cadastradas.
    - [ ] Listar tarefas por instrutor.
    - [ ] Listar tarefas por curso.
    - [ ] Listar tarefas por aula.
    - [ ] Listar tarefas por título.
    - [ ] Listar tarefas por data de criação.
    - [ ] Não permitir a listagem de todas as tarefas sem autenticação.

3. **Atualizar Tarefa**
    - [ ] Atualizar informações de uma tarefa cadastrada.
    - [ ] Evitar a atualização do título para um já existente.
    - [ ] Não permitir a atualização de uma tarefa que não pertence ao instrutor que está tentando atualizar.
    - [ ] Não permitir a atualização de uma tarefa que não existe.
    - [ ] Não permitir a atualização de uma tarefa sem autenticação.
    - [ ] Não permitir a atualização de uma tarefa sem ser um instrutor.

4. **Deletar Tarefa**
    - [ ] Deletar uma tarefa cadastrada.
    - [ ] Não permitir a exclusão de uma tarefa que não pertence ao instrutor que está tentando deletar.
    - [ ] Não permitir a exclusão de uma tarefa que não existe.
    - [ ] Não permitir a exclusão de uma tarefa sem autenticação.
    - [ ] Não permitir a exclusão de uma tarefa sem ser um instrutor.

5. **Visualizar Tarefa**
    - [ ]  Visualizar detalhes de uma tarefa, incluindo título, descrição, instrutor, curso, aula, perguntas e respostas.

### Foruns

1. **Cadastrar Forum**
   - [ ] Cadastrar um novo fórum com informações como título, descrição, instrutor, curso e tópicos.
   - [ ] Evitar o cadastro de um fórum com o mesmo título de outro já existente.
   - [ ] Não permitir o cadastro de um fórum sem autenticação e ser um estudante.
   - [ ] Não permitir o cadastro de um fórum sem ser um instrutor.

2. **Listar Foruns**
    - [ ] Listar todos os fóruns cadastrados.
    - [ ] Listar fóruns por instrutor.
    - [ ] Listar fóruns por curso.
    - [ ] Listar fóruns por tópicos.
    - [ ] Listar fóruns por título.
    - [ ] Listar fóruns por data de criação.
    - [ ] Não permitir a listagem de todos os fóruns sem autenticação.

3. **Atualizar Forum**
    - [ ] Atualizar informações de um fórum cadastrado.
    - [ ] Evitar a atualização do título para um já existente.
    - [ ] Não permitir a atualização de um fórum que não pertence ao instrutor que está tentando atualizar.
    - [ ] Não permitir a atualização de um fórum que não existe.
    - [ ] Não permitir a atualização de um fórum sem autenticação e ser um estudante.
    - [ ] Não permitir a atualização de um fórum sem ser um instrutor.

4. **Deletar Forum**
    - [ ] Deletar um fórum cadastrado.
    - [ ] Não permitir a exclusão de um fórum que não pertence ao instrutor que está tentando deletar.
    - [ ] Não permitir a exclusão de um fórum que não existe.
    - [ ] Não permitir a exclusão de um fórum sem autenticação e ser um estudante.
    - [ ] Não permitir a exclusão de um fórum sem ser um instrutor.

5. **Visualizar Forum**
    - [ ] Visualizar detalhes de um fórum, incluindo título, descrição, instrutor, curso, estudante que criou, tópicos e data de criação.

6. **Responder Forum**
    - [ ] Responder a um fórum cadastrado.
    - [ ] Não permitir a resposta a um fórum sem autenticação e ser um estudante.

7. **Listar Respostas**
    - [ ] Listar todas as respostas cadastradas.
    - [ ] Listar respostas por fórum.
    - [ ] Listar respostas por estudante.
    - [ ] Listar respostas por data de criação.
    - [ ] Não permitir a listagem de todas as respostas sem autenticação.

8. **Atualizar Resposta**
    - [ ] Atualizar uma resposta cadastrada.
    - [ ] Não permitir a atualização de uma resposta que não pertence ao estudante que está tentando atualizar.
    - [ ] Não permitir a atualização de uma resposta sem autenticação e ser um estudante.


9. **Deletar Resposta**
    - [ ] Deletar uma resposta cadastrada.
    - [ ] Não permitir a exclusão de uma resposta que não pertence ao estudante que está tentando deletar.
    - [ ] Não permitir a exclusão de uma resposta que não existe.
    - [ ] Não permitir a exclusão de uma resposta sem autenticação e ser um estudante.
