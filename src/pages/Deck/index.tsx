import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiEdit2, FiTrash2 } from 'react-icons/fi'
import Modal from '../../components/Modal'
import api, { handleApiError } from '../../services/api'
import { Toast } from '../../services/Toast'
import {
  ActionButton,
  ButtonContainer,
  CardsContainer,
  CardsTitle,
  CloseButton,
  Container,
  Content,
  CreateButton,
  Header,
  StudyButton
} from './styles'
import DeckInfo from './components/DeckInfo'
import CardItem from './components/CardList'
import UpdateDeckModal from './components/UpdateDeckModal'
import UpdateCardModal from './components/UpdateCardModal'

export type DeckData = {
  id: string
  name: string
  description: string
  cards: {
    totalQuantity: number
    availableForStudyQuantity: number
  }
}

export type Card = {
  id: string
  deckId: string
  originalText: string
  translatedText: string
  audioFileName: string
}

const Deck: React.FC = () => {
  const [isDeckModalOpen, setIsDeckModalOpen] = useState(false)
  const [isCardModalOpen, setIsCardModalOpen] = useState(false)
  const [loadingData, setIsLoadingData] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isDeleteDeckModalOpen, setIsDeleteDeckModalOpen] = useState(false)
  const [cardToHandle, setCardToHandle] = useState<Card>({} as Card)
  const [isDeletingCard, setIsDeletingCard] = useState(false)
  const [isDeletingDeck, setIsDeletingDeck] = useState(false)
  const [deck, setDeck] = useState<DeckData | null>(null)
  const [cards, setCards] = useState<Card[]>([])
  const { id: deckId } = useParams()
  const navigate = useNavigate()

  const findInfo = async () => {
    try {
      setIsLoadingData(true)

      const [deckResponse, cardsResponse] = await Promise.all([
        api.get(`v1/decks/${deckId}`),
        api.get(`v1/decks/${deckId}/cards`)
      ])

      setDeck(deckResponse.data)
      setCards(cardsResponse.data.cards)
    } catch (error) {
      handleApiError(error)
    } finally {
      setIsLoadingData(false)
    }
  }

  useEffect(() => {
    findInfo()
  }, [deckId])

  const toggleDeleteModal = (card: Card = {} as Card) => {
    setIsDeleteModalOpen(!isDeleteModalOpen)
    setCardToHandle(card)
  }

  const toggleCardModal = (card: Card = {} as Card) => {
    setIsCardModalOpen(!isCardModalOpen)
    setCardToHandle(card)
  }

  const afterUpdateDeck = (deckName: string) => {
    setDeck({ ...deck, name: deckName } as DeckData)
  }

  const afterUpdateCard = (card: Card) => {
    const cardsCopy = [...cards]
    const findIndex = cardsCopy.findIndex((item) => item.id === card.id)
    cardsCopy.splice(findIndex, 1, card)
    setCards(cardsCopy)
  }

  const toggleDeleteDeckModal = () => {
    setIsDeleteDeckModalOpen(!isDeleteDeckModalOpen)
  }

  const handleDeleteCard = async () => {
    try {
      setIsDeletingCard(true)
      await api.delete(`v1/cards/${cardToHandle.id}`)
      Toast.success('Card excluído com sucesso')
      toggleDeleteModal()
      setCards([...cards].filter((card) => card.id !== cardToHandle.id))
    } catch (error) {
      handleApiError(error)
    } finally {
      setIsDeletingCard(false)
      setCardToHandle({} as Card)
    }
  }

  const goBack = () => {
    navigate('/dashboard')
  }

  const goToStudyPage = () => {
    if (!deck?.cards.availableForStudyQuantity) {
      Toast.warning('Nenhum card disponível para estudar')
      return
    }

    navigate(`/study?deckId=${deckId}`)
  }

  const handleDeleteDeck = async () => {
    try {
      setIsDeletingDeck(true)
      await api.delete(`v1/decks/${deckId}`)
      Toast.success('Deck excluído com sucesso')
      goBack()
    } catch (error) {
      handleApiError(error)
    } finally {
      setIsDeletingDeck(false)
      setCardToHandle({} as Card)
    }
  }

  const toggleDeckModal = () => {
    setIsDeckModalOpen(!isDeckModalOpen)
  }

  if (loadingData) {
    return (
      <Container>
        <Content>
          <FiArrowLeft
            style={{ cursor: 'pointer', marginBottom: '16px' }}
            onClick={goBack}
            size={24}
          />
          <p>Carregando...</p>
        </Content>
      </Container>
    )
  }

  if (!deck) {
    return (
      <Container>
        <Content>
          <FiArrowLeft
            style={{ cursor: 'pointer', marginBottom: '16px' }}
            onClick={goBack}
            size={24}
          />
          <p>Deck não encontrado</p>
        </Content>
      </Container>
    )
  }

  return (
    <Container>
      <Content>
        <Header>
          <FiArrowLeft
            style={{ cursor: 'pointer' }}
            onClick={goBack}
            size={24}
          />

          <div>
            <ActionButton
              title="Alterar deck"
              onClick={toggleDeckModal}
              type="button"
            >
              <FiEdit2 size={24} />
            </ActionButton>

            <ActionButton
              title="Excluir deck"
              onClick={toggleDeleteDeckModal}
              type="button"
            >
              <FiTrash2 size={24} />
            </ActionButton>
          </div>
        </Header>

        <DeckInfo deck={deck} />

        <StudyButton type="button" onClick={goToStudyPage}>
          Estudar
        </StudyButton>

        <CardsTitle>Todos os cards</CardsTitle>

        <CardsContainer>
          {cards.map((card) => (
            <CardItem
              card={card}
              key={card.id}
              toggleCardModal={toggleCardModal}
              toggleDeleteModal={toggleDeleteModal}
            />
          ))}
        </CardsContainer>

        {!cards.length && <p>Nenhum card cadastrado</p>}
      </Content>

      <Modal
        isOpen={isDeleteModalOpen}
        setIsOpen={toggleDeleteModal}
        contentStyle={{ maxWidth: '468px' }}
      >
        <p>Você realmente deseja excluir este card?</p>

        <ButtonContainer>
          <CloseButton
            secondary
            onClick={() => toggleDeleteModal()}
            type="button"
          >
            Fechar
          </CloseButton>
          <CreateButton
            loading={isDeletingCard}
            onClick={handleDeleteCard}
            type="submit"
          >
            Excluir
          </CreateButton>
        </ButtonContainer>
      </Modal>

      <Modal
        isOpen={isDeleteDeckModalOpen}
        setIsOpen={toggleDeleteDeckModal}
        contentStyle={{ maxWidth: '468px' }}
      >
        <p>
          Você realmente deseja excluir este deck e seus {cards.length} cards?
        </p>

        <ButtonContainer>
          <CloseButton secondary onClick={toggleDeleteDeckModal} type="button">
            Fechar
          </CloseButton>
          <CreateButton
            loading={isDeletingDeck}
            onClick={handleDeleteDeck}
            type="submit"
          >
            Excluir
          </CreateButton>
        </ButtonContainer>
      </Modal>

      <UpdateDeckModal
        isOpen={isDeckModalOpen}
        deck={deck}
        setIsOpen={toggleDeckModal}
        afterUpdateDeck={afterUpdateDeck}
      />
      <UpdateCardModal
        card={cardToHandle}
        isOpen={isCardModalOpen}
        setIsOpen={toggleCardModal}
        afterUpdateCard={afterUpdateCard}
      />
    </Container>
  )
}

export default Deck
