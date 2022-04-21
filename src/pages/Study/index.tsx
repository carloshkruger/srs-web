import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import api, { handleApiError } from '../../services/api'
import {
  ButtonsContainer,
  Container,
  Content,
  DifficultyButton,
  FlipCard,
  FlipCardBack,
  FlipCardBackTextContainer,
  FlipCardBackTextContainerOriginalText,
  FlipCardFront,
  GoBackIcon,
  Text,
  TurnCardButton,
  TurnCardButtonContainer,
  StudyCompletedContainer,
  StudyCompletedText,
  AudioWaveContainer
} from './styles'
import AudioWave from '../../components/AudioWave'

export type Card = {
  id: string
  deckId: string
  originalText: string
  translatedText: string
  audioFileName: string
}

const CardReviewDifficultyLevel = {
  TOTAL_BLACKOUT: 0,
  HARD: 1,
  GOOD: 4,
  EASY: 5
}

const Study: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [isSavingReview, setIsSavingReview] = useState(false)
  const [cards, setCards] = useState<Card[]>([])
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isBackCardVisible, setIsBackCardVisible] = useState(false)
  const [isStudyFinished, setIsStudyFinished] = useState(false)

  const navigate = useNavigate()

  const fetchCards = async () => {
    try {
      setLoading(true)

      const response = await api.get('/v1/cards/study')

      setCards(response.data.cards)
    } catch (error) {
      handleApiError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCards()
  }, [])

  const goBack = () => {
    navigate(-1)
  }

  const toggleBackCardVisibility = () => {
    setIsBackCardVisible(!isBackCardVisible)
  }

  const handleChosenDifficulty = async (difficultyLevel: number) => {
    try {
      setIsSavingReview(true)

      await api.post(`/v1/cards/${cards[currentCardIndex].id}/review`, {
        difficultyLevel
      })

      if (currentCardIndex < cards.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1)
        toggleBackCardVisibility()
      } else {
        setIsStudyFinished(true)
      }
    } catch (error) {
      handleApiError(error)
    } finally {
      setIsSavingReview(false)
    }
  }

  if (loading) {
    return (
      <Container>
        <Content>
          <GoBackIcon onClick={goBack} size={24} />
          <p>Carregando...</p>
        </Content>
      </Container>
    )
  }

  if (!cards.length) {
    return (
      <Container>
        <Content>
          <GoBackIcon onClick={goBack} size={24} />
          <p>Nenhum card encontrado</p>
        </Content>
      </Container>
    )
  }

  if (isStudyFinished) {
    return (
      <Container>
        <Content>
          <GoBackIcon onClick={goBack} size={24} />
          <StudyCompletedContainer>
            <StudyCompletedText>Estudo finalizado</StudyCompletedText>
            <Button secondary onClick={goBack}>
              Voltar
            </Button>
          </StudyCompletedContainer>
        </Content>
      </Container>
    )
  }

  return (
    <Container>
      <Content>
        <GoBackIcon onClick={goBack} size={24} />

        <FlipCard>
          <FlipCardFront isBackCardVisible={isBackCardVisible}>
            <Text>{cards[currentCardIndex].originalText}</Text>

            <AudioWaveContainer>
              <AudioWave audio="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
            </AudioWaveContainer>

            <TurnCardButtonContainer>
              <TurnCardButton secondary onClick={toggleBackCardVisibility}>
                Virar carta
              </TurnCardButton>
            </TurnCardButtonContainer>
          </FlipCardFront>
          <FlipCardBack isBackCardVisible={isBackCardVisible}>
            <FlipCardBackTextContainer>
              <FlipCardBackTextContainerOriginalText>
                {cards[currentCardIndex].originalText}
              </FlipCardBackTextContainerOriginalText>
              <Text>{cards[currentCardIndex].translatedText}</Text>
            </FlipCardBackTextContainer>

            <AudioWaveContainer>
              {isBackCardVisible && (
                <AudioWave audio="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
              )}
            </AudioWaveContainer>

            <TurnCardButtonContainer>
              <TurnCardButton secondary onClick={toggleBackCardVisibility}>
                Virar carta
              </TurnCardButton>
            </TurnCardButtonContainer>
          </FlipCardBack>
        </FlipCard>

        <ButtonsContainer>
          <DifficultyButton
            disabled={isSavingReview || !isBackCardVisible}
            type="button"
            onClick={() =>
              handleChosenDifficulty(CardReviewDifficultyLevel.EASY)
            }
          >
            Fácil
          </DifficultyButton>
          <DifficultyButton
            disabled={isSavingReview || !isBackCardVisible}
            type="button"
            onClick={() =>
              handleChosenDifficulty(CardReviewDifficultyLevel.GOOD)
            }
          >
            Bom
          </DifficultyButton>
          <DifficultyButton
            disabled={isSavingReview || !isBackCardVisible}
            type="button"
            onClick={() =>
              handleChosenDifficulty(CardReviewDifficultyLevel.HARD)
            }
          >
            Difícil
          </DifficultyButton>
          <DifficultyButton
            disabled={isSavingReview || !isBackCardVisible}
            type="button"
            onClick={() =>
              handleChosenDifficulty(CardReviewDifficultyLevel.TOTAL_BLACKOUT)
            }
          >
            Não lembro
          </DifficultyButton>
        </ButtonsContainer>
      </Content>
    </Container>
  )
}

export default Study
