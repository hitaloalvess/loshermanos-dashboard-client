import { Button } from '../../Buttons';
import {
    FormDeleteActions,
    FormDeleteContainer,
    FormDeleteSubtitle,
    FormDeleteTitle,
} from './styles';

interface IFormDeleteProps {
    title: string;
    subtitle: string;
    funCancelButton: () => void;
    funDeleteButton: () => void;
}

function FormDelete({
    title,
    subtitle,
    funCancelButton,
    funDeleteButton,
}: IFormDeleteProps) {
    return (
        <FormDeleteContainer>
            <FormDeleteTitle>{title}</FormDeleteTitle>
            <FormDeleteSubtitle>{subtitle}</FormDeleteSubtitle>

            <FormDeleteActions>
                <Button type="cancel" onClick={funCancelButton}>
                    <p>Cancelar</p>
                </Button>
                <Button onClick={funDeleteButton}>
                    <p>Sim, excluir</p>
                </Button>
            </FormDeleteActions>
        </FormDeleteContainer>
    );
}

export { FormDelete };
