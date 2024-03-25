import { Box, Input, IconButton } from '@mui/joy';
import { Remove, ArrowRight, ArrowDropDown } from '@mui/icons-material';

export default function QuestionInput({ question, updateQuestionDOM, deleteQuestionDOM, onExpand }) {
    const updateQuestion = (event, questionId) => {
        const name = event.target.value
        fetch("http://localhost:8080/questions/" + questionId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: name })
        })
        .then(res => res.json())
        .then(data => updateQuestionDOM(data));
    }

    const deleteQuestion = (questionId) => {
        fetch("http://localhost:8080/questions/" + questionId, {
            method: "DELETE"
        });
        deleteQuestionDOM(questionId);
    }

    return (
        <Box sx={{
            display: "flex",
            gap: 0.5
        }}>
            <IconButton
                sx={{ minWidth: 0 }}
                onClick={() => onExpand(question.id)}
            >{question.isExpanded ? <ArrowDropDown /> : <ArrowRight />}</IconButton>
            <Input
                value={question.name}
                onChange={(event) => updateQuestion(event, question.id)}
                sx={{ width: "100%" }}
                spellCheck="false"
            />
            <IconButton
                onClick={() => deleteQuestion(question.id)}
                variant="soft"
            ><Remove /></IconButton>
        </Box>
    )
}
