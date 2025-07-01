const canvas = document.getElementById('canva')
const contexto = canvas.getContext('2d')
const container = document.querySelector('.conteudo')

let hoveredAstro = null

const astros = [
    {
        nome: "Sol", cor: "#FFD700", tamanho: 60, x: 0, y: 0, caminho: "img/astros/sol.png"
    },
    {
        nome: "Gêmeos da Ampulheta", raioOrbita: 100, velocidadeOrbita: 0.00777, tamanho: 25, anguloAtual: Math.random() * Math.PI * 2,
        caminho: "img/astros/gemeos.png"
    },
    {
        nome: "Recanto Lenhoso", raioOrbita: 160, velocidadeOrbita: 0.00648, tamanho: 27, anguloAtual: Math.random() * Math.PI * 2,
        caminho: "img/astros/recanto.png"
    },
    {
        nome: "Vale Incerto", raioOrbita: 220, velocidadeOrbita: 0.00555, tamanho: 25, anguloAtual: Math.random() * Math.PI * 2,
        caminho: "img/astros/vale.png"
    },
    {
        nome: "Profundezas do Gigante", raioOrbita: 300, velocidadeOrbita: 0.00468, tamanho: 50, anguloAtual: Math.random() * Math.PI * 2,
        caminho: "img/astros/gigante.png"
    },
    {
        nome: "Abrolho Sombrio", raioOrbita: 380, velocidadeOrbita: 0.00423, tamanho: 25, anguloAtual: Math.random() * Math.PI * 2,
        caminho: "img/astros/abrolho.png"
    }
]

function obterImagem(caminho) {
    const img = new Image()
    img.src = caminho
    return img
}

function ajustarCanva() {
    if (container) {
        canvas.width = container.clientWidth
        canvas.height = container.clientHeight
        if (astros.length > 0) {
            astros[0].x = canvas.width / 2
            astros[0].y = canvas.height / 2
        }
    }
}

function desenhar(astro) {
    if (astro.raioOrbita) {
        const sol = astros[0]
        contexto.strokeStyle = 'rgba(255, 255, 255, 0.45)'
        contexto.beginPath()
        contexto.setLineDash([5, 5])
        contexto.arc(sol.x, sol.y, astro.raioOrbita, 0, Math.PI * 2)
        contexto.stroke()
        contexto.closePath()
    }

    let tamanhoAtual = astro.tamanho

    if (astro === hoveredAstro) {
        tamanhoAtual *= 1.2
    }

    const imagemAstro = obterImagem(astro.caminho)

    const imgLargura = tamanhoAtual * 2
    const imgAltura = tamanhoAtual * 2
    const xPos = astro.x - tamanhoAtual
    const yPos = astro.y - tamanhoAtual
    contexto.drawImage(imagemAstro, xPos, yPos, imgLargura, imgAltura)
}

function isMouseOverAstro(mouseX, mouseY, astro) {
    const distancia = Math.sqrt(
        (mouseX - astro.x) ** 2 + (mouseY - astro.y) ** 2
    )
    return distancia <= astro.tamanho
}

function animar() {
    contexto.clearRect(0, 0, canvas.width, canvas.height)

    const sol = astros[0]
    astros.forEach(astro => {
        if (astro.raioOrbita) {
            astro.anguloAtual += astro.velocidadeOrbita
            astro.x = sol.x + astro.raioOrbita * Math.cos(astro.anguloAtual)
            astro.y = sol.y + astro.raioOrbita * Math.sin(astro.anguloAtual)
        }
        desenhar(astro)
    })

    requestAnimationFrame(animar)
}

canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect()
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top

    let novoHoveredAstro = null
    
    for (let i = 1; i < astros.length; i++) {
        const astro = astros[i]
        if (isMouseOverAstro(mouseX, mouseY, astro)) {
            novoHoveredAstro = astro
            break
        }
    }

    if (novoHoveredAstro !== hoveredAstro) {
        hoveredAstro = novoHoveredAstro
    }
})

window.addEventListener('resize', ajustarCanva)
ajustarCanva()
animar()