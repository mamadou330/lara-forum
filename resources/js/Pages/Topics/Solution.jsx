import React from 'react'
import PrimaryButton from '@/Components/PrimaryButton';

const Solution = ({ myComment }) => {
    const submit = (e) => {
        e.preventDefault();
        post(route('comment.markedAsSolution', myComment), {
            onFinish: () => reset(),
        });
    };

    return (
        <>
          {progress && (
                <progress value={progress.percentage} max="100">
                    {progress.percentage}%
                </progress>
            )}
            <form onSubmit={submit}>
                <PrimaryButton>Marqué comme solution</PrimaryButton>
            </form>
        </>
    )
}

export default Solution
