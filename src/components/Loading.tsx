const Loading = () => {

    return (
        <div className="loader">
            <div className="loader-inner">
                {[...Array(5)].map((_, index) => (
                    <div key={`loader-line-${index}`} className="loader-line-wrap">
                        <div className="loader-line"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Loading;