/** Some related "constants" which represent the various outcomes a round can have. */
export const OUTCOME_WIN = "WIN" as string | null;
export const OUTCOME_DRAW = "DRAW" as string | null;
export const OUTCOME_LOSS = "LOSS" as string | null;

/** Some related "constants" which represent the possible choices a player can make when playing. */
export const CHOICE_ROCK = "ROCK" as string | null;
export const CHOICE_PAPER = "PAPER" as string | null;
export const CHOICE_SCISSORS = "SCISSORS" as string | null;

/** Should return a randomly selected choice. Either: "ROCK", "PAPER", "SCISSORS" */
export function getRandomComputerMove(): string | null {
  const choice = Math.trunc(Math.random() * 3);
  switch (choice) {
    case 0:
      return CHOICE_ROCK as string;
    case 1:
      return CHOICE_PAPER as string;
    case 2:
      return CHOICE_SCISSORS as string;
    default:
      throw new Error(`Unsupported choice: ${choice}`);
  }
}

/**
 * Should return either: "ROCK", "PAPER", "SCISSORS" (or null if the user cancelled)
 */
export function getPlayerMove(): string | null {
  while (true) {
    const rawInput = prompt("Enter a move: rock/paper/scissors") ;
    const userHasCancelled = null === rawInput;

    if (userHasCancelled) {
      return null;
    }

    switch (rawInput?.toLowerCase()) {
      case "r":
      case "rock":
        return CHOICE_ROCK as string | null;
      case "p":
      case "paper":
        return CHOICE_PAPER as string | null;
      case "s":
      case "scissors":
        return CHOICE_SCISSORS as string | null;
    }
  }
}

/** Should return an outcome. Either "WIN", "LOSS" or "DRAW" */
export function getOutcomeForRound(playerChoice: string | null, computerChoice: string | null) {
  const playerHasDrawn = playerChoice === computerChoice;

  if (playerHasDrawn) {
    return OUTCOME_DRAW;
  }

  const playerHasWon =
    (playerChoice === CHOICE_PAPER && computerChoice === CHOICE_ROCK) ||
    (playerChoice === CHOICE_SCISSORS && computerChoice === CHOICE_PAPER) ||
    (playerChoice === CHOICE_ROCK && computerChoice === CHOICE_SCISSORS);

  if (playerHasWon) {
    return OUTCOME_WIN;
  }

  return OUTCOME_LOSS;
}

/** Should return an object containing information about the played round. */
export function playOneRound(): { playerMove: string; computerMove: string | null; outcome: string | null } | null {
  const playerMove = getPlayerMove() as string | null;
  if (null === playerMove) {
    return null;
  }

  const computerMove = getRandomComputerMove() as string | null;
  const outcome = getOutcomeForRound(playerMove, computerMove);

return {
    playerMove,
    computerMove,
    outcome,
  };
}

/** Should return undefined/void if the loop were to stop. */
export function playGame(): void {
  /** Some basic game state, where things like scores are tracked. */
  let model = {
    playerScore: 0,
    computerScore: 0,
  };

  while (true) {
    const dataForRound = playOneRound();

    if (null === dataForRound) {
      break;
    }

    model = updateModel(model, dataForRound);
    showProgressInConsole(dataForRound, model);
  }
}

export function updateModel(model: any , dataForRound: any) {
  switch (dataForRound.outcome) {
    case OUTCOME_WIN:
      return { ...model, playerScore: model.playerScore + 1 };
    case OUTCOME_LOSS:
      return { ...model, computerScore: model.computerScore + 1 };
    default:
      return model;
  }
}

export function showProgressInConsole(dataForRound: any, model: any) {
  console.table([
    {
      "Your choice": dataForRound.playerMove,
      "Computer choice": dataForRound.computerMove,
      Outcome: dataForRound.outcome,
      "Your score": model.playerScore,
      "Computer score": model.computerScore,
    },
  ]);
}

playGame();