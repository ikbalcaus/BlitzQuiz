import { Box, Input, IconButton, Checkbox } from '@mui/joy';
import { Check, Remove } from '@mui/icons-material';

export default function AnswerInput({ answer, questionId, updateAnswerDOM, deleteAnswerDOM, changeStateDOM }) {
    const updateAnswer = (event, answerId) => {
        const name = event.target.value
        fetch("http://localhost:8080/answers/" + answerId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                questionId: questionId,
                name: name,
                isCorrect: answer.isCorrect
            })
        })
        .then(res => res.json())
        .then(data => updateAnswerDOM(data));
    }

    const deleteAnswer = (answerId) => {
        fetch("http://localhost:8080/answers/" + answerId, {
            method: "DELETE"
        })
        deleteAnswerDOM(answerId);
    }

    const changeStateAnswer = (answerId) => {
        fetch("http://localhost:8080/answers/" + answerId, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                isCorrect: !answer.isCorrect
            })
        });
        changeStateDOM(answerId);
    }

    return (
        <Box sx={{
            display: "flex",
            gap: 0.5,
            alignItems: "center",
            width: "80%",
            position: "relative",
            left: "50%",
            transform: "translateX(-50%)"
        }}>
            <Checkbox
                checked={answer.isCorrect}
                onClick={() => changeStateAnswer(answer.id)}
            />
            <Input sx={{
                width: "100%",
                borderTop: 0
            }}
                value={answer.name}
                onChange={() => updateAnswer(answer.id)}
                autoComplete="off"
            />
            <IconButton
                variant="soft"
                onClick={() => deleteAnswer(answer.id)}
            ><Remove /></IconButton>
        </Box>
    )
}
