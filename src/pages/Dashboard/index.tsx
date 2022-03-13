import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import api from '../../services/api'
import CreateDeckModal from './components/CreateDeckModal'
import CreateCardModal from './components/CreateCardModal'
import DeckCardsList from './components/DeckCardsList'
import { Container, Content, DeckTitle, Header } from './styles'
import { useAuth } from '../../hooks/Auth'

export interface DeckData {
  deck: {
    id: string
    name: string
    description: string
  }
  cards: {
    totalQuantity: number
    availableForStudyQuantity: number
  }
}

const Dashboard: React.FC = () => {
  const [isCardModalOpen, setIsCardModalOpen] = useState(false)
  const [isDeckModalOpen, setIsDeckModalOpen] = useState(false)
  const [decks, setDecks] = useState<DeckData[]>([])
  const { signOut } = useAuth()

  const findDecksForStudy = async () => {
    try {
      const response = await api.get('v1/decks/study')
      setDecks(response.data.decks)
    } catch {
      setDecks([])
      toast('Erro ao buscar os decks para estudo', { type: 'error' })
    }
  }

  useEffect(() => {
    findDecksForStudy()
  }, [])

  const toggleDeckModal = () => {
    setIsDeckModalOpen(!isDeckModalOpen)
  }

  const afterCreateCard = () => {
    findDecksForStudy()
  }

  const toggleCardModal = () => {
    if (!decks.length) {
      toast('Necessário primeiro criar um deck', { type: 'warning' })
      return
    }

    setIsCardModalOpen(!isCardModalOpen)
  }

  return (
    <>
      <Header>
        <ul>
          <li>Meu perfil</li>
          <li onClick={toggleDeckModal}>Criar deck</li>
          <li onClick={toggleCardModal}>Criar card</li>
          <li onClick={signOut}>Sair</li>
        </ul>
      </Header>
      <Container>
        <Content>
          <DeckTitle>Decks</DeckTitle>

          {!decks.length && (
            <p>
              Nenhum deck cadastrado. Para começar, crie um deck e adicione
              cards a ele.
            </p>
          )}

          <DeckCardsList decks={decks} />
        </Content>

        <CreateDeckModal
          isOpen={isDeckModalOpen}
          setIsOpen={toggleDeckModal}
          afterCreateDeck={findDecksForStudy}
        />
        <CreateCardModal
          isOpen={isCardModalOpen}
          setIsOpen={toggleCardModal}
          afterCreateCard={afterCreateCard}
          decks={decks.map((item) => ({
            name: item.deck.name,
            id: item.deck.id
          }))}
        />
      </Container>
    </>
  )
}

export default Dashboard
