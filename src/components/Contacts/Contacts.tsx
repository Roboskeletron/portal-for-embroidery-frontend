function Contacts() {
    const hStyle = {
        fontWeight: 600,
    };

    return (
        <div className="container p-5 overflow-hidden">
            <h1 className="h4 mb-4 fw-normal text-center">Contacts</h1><br/>
            <div className="container w-75">
                <h6 className="h5 mb-4 fw-normal text-right">Below will be presented all our social networks,
                    numbers
                    and emails, with the help of which you can contact us at any time! You can contact us for technical
                    questions, leave feedback or express your wishes. We look forward to your submission!</h6>
                <h6 className="h5 fw-normal text-right"><span style={hStyle}>Email:</span> katseliv@yandex.ru</h6>
                <h6 className="h5 fw-normal text-right"><span style={hStyle}>Phone:</span> +7 (908)-143-20-43</h6>
                <h6 className="h5 fw-normal text-right"><span style={hStyle}>GitHub:</span>
                    <a href="https://github.com/katseliv" className="px-2 text-muted">https://github.com/katseliv</a>
                </h6>
                <h6 className="h5 fw-normal text-right"><span style={hStyle}>VKontakte:</span>
                    <a href="https://vk.com/im_confident" className="px-2 text-muted">https://vk.com/im_confident</a>
                </h6>
                <h6 className="h5 fw-normal text-right"><span style={hStyle}>Instagram:</span>
                    <a href="https://www.instagram.com/katsleep" className="px-2 text-muted">https://www.instagram.com/katsleep</a>
                </h6>
            </div>
        </div>
    );
}

export default Contacts;