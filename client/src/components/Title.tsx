interface Props {
    mainText: string;
    subText?: string;
}

function Title({ mainText, subText }: Props) {
    return (
        <h1
            className='text-center mt-3'
            style={{ fontSize: 50 + 'px' }}
        >
            {mainText} <br />
            {subText && <small className='text-muted'>{subText}</small>}
            <hr />
        </h1>
    );
}

export default Title;
