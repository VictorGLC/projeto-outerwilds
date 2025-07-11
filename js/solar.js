import {astros} from './data.js'

const canvas = document.getElementById('canva')
const contexto = canvas.getContext('2d')
const container = document.querySelector('.conteudo') // Necessário pra não incluir o header na animação

// Função para obter a imagem de um astro
// Recebe o caminho da imagem e retorna um objeto Image
// Isso é feito para evitar carregar a imagem repetidamente durante a animação
// As imagens são carregadas uma vez e reutilizadas, melhorando a performance
// A função é chamada dentro do loop de desenho para garantir que a imagem esteja pronta para ser desenhada
function obterImagem(caminho) {
    const img = new Image()
    img.src = caminho
    return img
}

// Ajusta o tamanho do canvas para preencher o container
// e centraliza o Sol no meio do canvas
// Isso é feito uma vez no início e sempre que a janela é redimensionada
// para garantir que o Sol permaneça centralizado
// e o canvas preencha o container corretamente.
function ajustarCanva() {
    // Define o tamanho do canvas para o tamanho do container
    canvas.width = container.clientWidth
    canvas.height = container.clientHeight
    // Centraliza o Sol no meio do canvas
    astros[0].x = canvas.width / 2
    astros[0].y = canvas.height / 2
}

// Função para desenhar cada astro no canvas
// Recebe um objeto astro que contém suas propriedades
// Desenha a órbita do astro se definido (se possui) e a imagem do astro
function desenhar(astro) {
    // Verifica se o astro tem uma órbita definida (o sol não tem)
    if (astro.raioOrbita) {
        // Desenha a órbita do astro
        const sol = astros[0]
        contexto.strokeStyle = 'rgba(255, 255, 255, 0.45)'
        contexto.beginPath()
        contexto.setLineDash([5, 5])
        contexto.arc(sol.x, sol.y, astro.raioOrbita, 0, Math.PI * 2)
        contexto.stroke()
        contexto.closePath()
    }

    let raioAtual = astro.raio

    // Se o astro está sendo destacado (hovered), aumenta seu tamanho
    if (astro === hoveredAstro) {
        raioAtual *= 1.2
    }

    // Desenha a imagem do astro no canvas
    const imagemAstro = obterImagem(astro.caminho)
    const imgLargura = raioAtual * 2
    const imgAltura = raioAtual * 2
    const xPos = astro.x - raioAtual
    const yPos = astro.y - raioAtual
    contexto.drawImage(imagemAstro, xPos, yPos, imgLargura, imgAltura)
}

// Função principal que anima o sistema solar
// Limpa o canvas a cada frame, atualiza as posições dos astros
// Desenha cada astro no canvas
// Utiliza requestAnimationFrame para criar uma animação suave
// A posição do Sol é fixa no centro do canvas, enquanto os outros astros orbitam ao redor dele
function animar() {
    // Limpa o canvas antes de desenhar o próximo frame
    contexto.clearRect(0, 0, canvas.width, canvas.height)

    // Desenha os astros no canvas
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

// Variável para armazenar o astro atualmente em destaque
let hoveredAstro = null

// Função para verificar se o mouse está sobre um astro
// Recebe as coordenadas do mouse e o objeto astro
// Calcula a distância entre o mouse e o centro do astro
// Se a distância for menor ou igual ao tamanho do astro, retorna true
// Caso contrário, retorna false
function isMouseOverAstro(mouseX, mouseY, astro) {
    const distancia = Math.sqrt(
        (mouseX - astro.x) ** 2 + (mouseY - astro.y) ** 2
    )
    return distancia <= astro.raio
}

// Adiciona um listener para o evento de mousemove no canvas
// Quando o mouse se move, verifica se está sobre algum astro
// Se estiver, atualiza a variável hoveredAstro para o astro atual
// Isso permite destacar o astro sob o mouse, aumentando seu tamanho
canvas.addEventListener('mousemove', (event) => {
    // Obtém as coordenadas do mouse em relação ao canvas
    const rect = canvas.getBoundingClientRect()
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top

    // Verifica se o mouse está sobre algum astro
    let novoHoveredAstro = null
    
    // Começa a verificar a partir do segundo astro (o Sol não deve ser destacado)
    for (let i = 1; i < astros.length; i++) {
        const astro = astros[i]
        if (isMouseOverAstro(mouseX, mouseY, astro)) {
            novoHoveredAstro = astro
            break
        }
    }

    // Se o mouse não estiver sobre nenhum astro, remove o destaque
    if (novoHoveredAstro !== hoveredAstro) {
        hoveredAstro = novoHoveredAstro
    }
})

ajustarCanva()
animar()