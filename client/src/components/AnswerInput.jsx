import { Box, Input, IconButton } from '@mui/joy';
import { Remove } from '@mui/icons-material';

export default function AnswerInput({ answer, questionId, updateAnswerDOM, deleteAnswerDOM }) {
    const updateAnswer = (event, answerId) => {
        const name = event.target.value
        fetch("http://localhost:8080/answers/" + answerId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                questionId: questionId,
                name: name
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

    return (
        <Box sx={{
            display: "flex",
            gap: 0.5,
            width: "80%",
            mx: "auto"
        }}>
            <Input sx={{
                width: "100%",
                borderTop: 0
            }}
                value={answer.name}
                onChange={(event) => updateAnswer(event, answer.id)}
                autoComplete="off"
            />
            <IconButton
                variant="soft"
                onClick={() => deleteAnswer(answer.id)}
            ><Remove /></IconButton>
        </Box>
    )
}
