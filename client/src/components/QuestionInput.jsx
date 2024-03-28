import { useContext } from 'react';
import { Box, Input, IconButton } from '@mui/joy';
import { Remove, ArrowRight, ArrowDropDown } from '@mui/icons-material';
import { GlobalContext } from '../index';

export default function QuestionInput({ question, updateQuestionDOM, deleteQuestionDOM, onExpand }) {
    const { serverAddress } = useContext(GlobalContext);

    const updateQuestion = (event, questionId) => {
        const name = event.target.value
        fetch(serverAddress + "/questions/" + questionId, {
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
        fetch(serverAddress + "/questions/" + questionId, {
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
                autoComplete="off"
                spellCheck="false"
            />
            <IconButton
                onClick={() => deleteQuestion(question.id)}
                variant="soft"
            ><Remove /></IconButton>
        </Box>
    )
}
