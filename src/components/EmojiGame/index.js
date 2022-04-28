/* 
Quick Tip 

- Use the below function in the EmojiGame Component to shuffle the emojisList every time when an emoji is clicked.

const shuffledEmojisList = () => {
  const {emojisList} = this.props
  return emojisList.sort(() => Math.random() - 0.5)
}

*/

// Write your code here.
import {Component} from 'react'

import './index.css'

import EmojiCard from '../EmojiCard/index'
import NavBar from '../NavBar/index'
import WinOrLossCard from '../WinOrLoseCard'

class EmojiGame extends Component {
  state = {clickedEmojisList: [], isGamePlaying: true, topScore: 0}

  resetGame = () => {
    this.setState({clickedEmojisList: [], isGamePlaying: true})
  }

  renderScoreView = () => {
    const {emojisList} = this.props
    const {clickedEmojisList} = this.state
    const isWon = emojisList.length === clickedEmojisList.length

    return (
      <WinOrLossCard
        isWon={isWon}
        score={clickedEmojisList.length}
        onClickPlayAgain={this.resetGame}
      />
    )
  }

  gameOverAndSetTopScore = currentScore => {
    const {topScore} = this.state
    let newTopScore = topScore

    if (currentScore > topScore) {
      newTopScore = currentScore
    }

    this.setState({topScore: newTopScore, isGamePlaying: false})
  }

  clickEmoji = id => {
    const {emojisList} = this.props
    const {clickedEmojisList} = this.state
    const isEmojiPresent = clickedEmojisList.includes(id)
    const clickedEmojiListLength = clickedEmojisList.length

    if (isEmojiPresent) {
      this.gameOverAndSetTopScore(clickedEmojiListLength)
    } else {
      if (clickedEmojiListLength === emojisList.length - 1) {
        this.gameOverAndSetTopScore(emojisList.length)
      }
      this.setState(prevState => ({
        clickedEmojisList: [...prevState.clickedEmojisList, id],
      }))
    }
  }

  getShuffledEmojisList = () => {
    const {emojisList} = this.props

    return emojisList.sort(() => Math.random() - 0.5)
  }

  renderEmojiItemsView = () => {
    const shuffledEmojisList = this.getShuffledEmojisList()

    return (
      <ul className="emoji-list-container">
        {shuffledEmojisList.map(eachEmoji => (
          <EmojiCard
            key={eachEmoji.id}
            emojiDetails={eachEmoji}
            clickEmoji={this.clickEmoji}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {clickedEmojisList, isGamePlaying, topScore} = this.state

    return (
      <div className="app-container">
        <NavBar
          currentScore={clickedEmojisList.length}
          topScore={topScore}
          isGamePlaying={isGamePlaying}
        />
        <div className="app-body">
          {isGamePlaying ? this.renderEmojiItemsView() : this.renderScoreView()}
        </div>
      </div>
    )
  }
}

export default EmojiGame
