class Livro {
    public titulo: string
    public autor: string
    public disponivel: boolean
    public emprestador: Usuario | undefined

    constructor(titulo: string, autor: string) {
        this.titulo = titulo
        this.autor = autor
        this.disponivel = true
        this.emprestador = undefined
    }
}

class Usuario {
    public nome: string
    public livros: Livro[]

    constructor(nome: string) {
        this.nome = nome
        this.livros = []
    }

    adicionarLivro(livro: Livro) {
        this.livros.push(livro)
    }

    removerLivro(livro: Livro) {
        const indice = this.livros.indexOf(livro)
        if (indice !== -1) {
            this.livros.splice(indice, 1)
        }
    }

    emprestarLivro(livro: Livro, para: Usuario) {
        if (this.livros.indexOf(livro) === -1) {
            console.log("Você não tem esse livro para emprestar.")
            return
        }

        if (!livro.disponivel) {
            console.log("Esse livro não está disponível.")
            return
        }

        this.removerLivro(livro)

        livro.disponivel = false
        livro.emprestador = this
        para.adicionarLivro(livro)

        console.log(`O livro foi emprestado para ${para.nome}!`)
    }

    devolverLivro(livro: Livro) {
        const emprestador = livro.emprestador

        if (emprestador) {
            this.removerLivro(livro)
            livro.disponivel = true
            livro.emprestador = undefined

            emprestador.adicionarLivro(livro)
            console.log(`O livro foi devolvido! ${emprestador.nome} recebeu o livro de volta.`)
        } else {
            console.log("O livro não possui um emprestador.")
        }
    }
}

class Biblioteca {
    private livros: Livro[]

    constructor() {
        this.livros = Array.from({ length: 100 }, (_, i) =>
            new Livro(`Livro ${i + 1}`, `Autor ${Math.floor(i / 10) + 1}`)
        )
    }

    async obter(): Promise<Livro[]> {
        // Simula uma operação assíncrona (como buscar dados de uma API)
        return new Promise((resolver) => {
            setTimeout(() => {
                resolver([...this.livros]) // Retorna uma cópia do array
            }, 100)
        })
    }
}
