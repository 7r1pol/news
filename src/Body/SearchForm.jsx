import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { getArticles } from "../services/apiService";


function SearchForm({ closeSideBar, submitedData, setSubmitedData, handleRestore }) {
    const [articlesSortDisabled, setArticlesSortDisabled] = useState(false);

    const resultType = [
        "articles",
        "uriWgtList",
        "langAggr",
        "timeAggr",
        "sourceAggr",
        "sourceExAggr",
        "authorAggr",
        "keywordAggr",
        "locAggr",
        "conceptAggr",
        "conceptGraph",
        "categoryAggr",
        "dateMentionAggr",
        "sentimentAggr",
        "recentActivityArticles",
    ];

    const articlesSortBy = [
        'date',
        'rel',
        'sourceImportance',
        'sourceAlexaGlobalRank',
        'sourceAlexaCountryRank',
        'socialScore',
        'facebookShares',
    ];

    const dataType = ["news", "pr", "blog",];

    const languages = [
        {
            label: 'English',
            value: 'eng',
        },
        {
            label: 'Eesti',
            value: 'est',
        },
        {
            label: 'Русский',
            value: 'rus',
        },
        {
            label: 'Spanish',
            value: 'spa',
        },
    ];

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            keyword: event.target.keyword.value,
            resultType: event.target.resultType.value,
            articlesSortBy: event.target.articlesSortBy.value,
            dataType: [...event.target.dataType]
                .filter((e) => e.checked)
                .map((d) => d.value),
            lang: [...event.target.lang]
                .filter((e) => e.selected)
                .map((d) => d.value),
            dateStart: event.target.dateStart.value,
            dateEnd: event.target.dateEnd.value,
        };

        setSubmitedData(data);

        console.log("data", data);

        getArticles(data).then((res) => console.log('res', res));

        closeSideBar();
    };

    const handleResultTypeChange = (event) => {
        if (event.target.value !== "articles") {
            setArticlesSortDisabled(true);
        } else {
            setArticlesSortDisabled(false);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Keywords</Form.Label>
                <Form.Control 
                type="text"
                name="keyword" 
                defaultValue={submitedData?.keyword} 
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Result Type</Form.Label>
                <Form.Select 
                name="resultType" 
                onChange={handleResultTypeChange} 
                defaultValue={submitedData?.resultType}
                >
                    {resultType.map((type) => (
                        <option value={type} key={type}>
                            {type}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>


            <Form.Group className="mb-3">
                <Form.Label>Articles Sort By</Form.Label>
                <Form.Select name="articlesSortBy" disabled={articlesSortDisabled} defaultValue={submitedData?.articlesSortBy}>
                    {articlesSortBy.map((type) => (
                        <option value={type} key={type}>
                            {type}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>


            <Form.Group className="mb-3">
                <Form.Label>Data type</Form.Label>
                {dataType.map((type) => (
                    <Form.Check
                        type="checkbox"
                        label={type}
                        key={type}
                        name="dataType"
                        Value={type}
                        defaultChecked={submitedData?.dataType.includes(type)}
                    />
                ))}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Language</Form.Label>
                <Form.Select name="lang" multiple defaultValue={submitedData?.lang}>
                    {languages.map(({ value, label }) => (
                        <option value={value} key={value}>
                            {label},
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Date start</Form.Label>
                <Form.Control 
                type="date"
                name="dateStart"
                defaultValue={submitedData?.dateStart}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Date end</Form.Label>
                <Form.Control 
                type="date" 
                name="dateEnd"
                defaultValue={submitedData?.dateEnd}/>
            </Form.Group>


            <Button variant="primary" type="submit" className="w-100">
                Search
            </Button>

            <Button variant="light" type="submit" className="w-100 mt-3" onClick={handleRestore}>
                Restore
            </Button>
        </Form>
    );
}

export default SearchForm;