const canvas = document.getElementById('canva')
const contexto = canvas.getContext('2d')
const container = document.querySelector('.conteudo')

// Variável para armazenar o astro atualmente em destaque
let hoveredAstro = null

// Definição dos astros do sistema solar (agora com cores em vez de imagens)
const astros = [
    {
        nome: "Sol", tamanho: 60, x: 0, y: 0, cor: "#FFD700"
    },
    {
        nome: "Gêmeos da Ampulheta", raioOrbita: 100, velocidadeOrbita: 0.00777, tamanho: 25, anguloAtual: Math.random() * Math.PI * 2,
        cor: "#FF7F50"
    },
    {
        nome: "Recanto Lenhoso", raioOrbita: 160, velocidadeOrbita: 0.00648, tamanho: 27, anguloAtual: Math.random() * Math.PI * 2,
        cor: "#228B22"
    },
    {
        nome: "Vale Incerto", raioOrbita: 220, velocidadeOrbita: 0.00555, tamanho: 25, anguloAtual: Math.random() * Math.PI * 2,
        cor: "#4682B4"
    },
    {
        nome: "Profundezas do Gigante", raioOrbita: 300, velocidadeOrbita: 0.00468, tamanho: 50, anguloAtual: Math.random() * Math.PI * 2,
        cor: "#9370DB"
    },
    {
        nome: "Abrolho Sombrio", raioOrbita: 380, velocidadeOrbita: 0.00423, tamanho: 25, anguloAtual: Math.random() * Math.PI * 2,
        cor: "#2F4F4F"
    }
]

// Ajusta o tamanho do canvas para preencher o container
function ajustarCanva() {
  canvas.width = container.clientWidth
  canvas.height = container.clientHeight

  // Fundo azul para o canvas
  contexto.fillStyle = '#3498db'
  contexto.fillRect(0, 0, canvas.width, canvas.height)

  // Retângulo (ex: canto superior esquerdo)
  contexto.fillStyle = '#FF6347' // vermelho tomate
  contexto.fillRect(50, 50, 150, 100) // (x, y, largura, altura) // tem o strokeRect tbm

  // Um círculo no centro (ex: simulando o Sol)
  const centroX = canvas.width / 2
  const centroY = canvas.height / 2
  const raio = 50

  contexto.beginPath()
  contexto.arc(centroX, centroY, raio, 0, Math.PI * 2)
  contexto.fillStyle = '#FFD700' // amarelo ouro
  contexto.fill()
  contexto.closePath()

  // Um círculo "planeta" em uma posição fixa
  contexto.beginPath()
  contexto.arc(centroX + 150, centroY, 20, 0, Math.PI * 2)
  contexto.fillStyle = '#FF7F50' // coral
  contexto.fill()
  contexto.closePath()

  // Texto para identificação
  contexto.fillStyle = 'white'
  contexto.font = '16px sans-serif'
  contexto.fillText('Teste de Canvas: Sol e planeta fixo', 10, 30)
}


// // Função para desenhar cada astro no canvas
// function desenhar(astro) {
//     if (astro.raioOrbita) {
//         const sol = astros[0]
//         contexto.strokeStyle = 'rgba(255, 255, 255, 0.45)'
//         contexto.beginPath()
//         contexto.setLineDash([5, 5]) 
//         contexto.arc(sol.x, sol.y, astro.raioOrbita, 0, Math.PI * 2)
//         contexto.stroke()
//         contexto.closePath()
//     }

//     let tamanhoAtual = astro.tamanho
//     if (astro === hoveredAstro) {
//         tamanhoAtual *= 1.2
//     }

//     contexto.beginPath()
//     contexto.fillStyle = astro.cor
//     contexto.arc(astro.x, astro.y, tamanhoAtual, 0, Math.PI * 2)
//     contexto.fill()
//     contexto.closePath()
// }

// // // Função de animação principal
// function animar() {
//     contexto.clearRect(0, 0, canvas.width, canvas.height)

//     const sol = astros[0]
//     astros.forEach(astro => {
//         if (astro.raioOrbita) {
//             astro.anguloAtual += astro.velocidadeOrbita
//             astro.x = sol.x + astro.raioOrbita * Math.cos(astro.anguloAtual)
//             astro.y = sol.y + astro.raioOrbita * Math.sin(astro.anguloAtual)
//         }
//         desenhar(astro)
//     })

//     requestAnimationFrame(animar)
// }

// // Verifica se o mouse está sobre um astro
// function isMouseOverAstro(mouseX, mouseY, astro) {
//     const distancia = Math.sqrt(
//         (mouseX - astro.x) ** 2 + (mouseY - astro.y) ** 2
//     )
//     return distancia <= astro.tamanho
// }

// // Detecta o movimento do mouse e atualiza o astro em destaque
// canvas.addEventListener('mousemove', (event) => {
//     const rect = canvas.getBoundingClientRect()
//     const mouseX = event.clientX - rect.left
//     const mouseY = event.clientY - rect.top

//     let novoHoveredAstro = null
//     for (let i = 1; i < astros.length; i++) {
//         if (isMouseOverAstro(mouseX, mouseY, astros[i])) {
//             novoHoveredAstro = astros[i]
//             break
//         }
//     }

//     hoveredAstro = novoHoveredAstro
// })

ajustarCanva()
animar()
