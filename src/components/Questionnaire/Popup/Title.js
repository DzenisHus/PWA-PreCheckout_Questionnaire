import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { FormattedMessage } from 'react-intl';

const GET_CMS_BLOCK = gql`
    query GetCmsBlock {
        cmsBlocks(identifiers: "questionnaire-form-title") {
            items {
                identifier
                title
                content
            }
        }
    }
`;

const Title = () => {
    const { loading, error, data } = useQuery(GET_CMS_BLOCK);

    if (loading) return <div>Loading...</div>;
    if (error) return <div><FormattedMessage id='Questionnaire.title' defaultMessage='Questionnaire' /></div>;

    const block = data.cmsBlocks.items[0];

    if (!block) {
        return <div>
            <FormattedMessage id='Questionnaire.title' defaultMessage='Questionnaire' />
        </div>;
    }

    return (
        <div dangerouslySetInnerHTML={{ __html: block.content }} />
    );
};

export default Title;
