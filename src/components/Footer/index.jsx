import P from 'prop-types';
import * as Styled from './styles';

export const Footer = () => {
  return (
    <Styled.Container>
      <div>
        <a
          href="https://www.udemy.com/user/luiz-otavio-miranda/"
          rel="noopener noreferrer"
          title="Conheça os cursos"
          target="_blank"
        >
          <span>&lt;Dev&gt;</span>Leonardo Costa
          <span>&lt;/Dev&gt;</span>
        </a>
      </div>
    </Styled.Container>
  );
};

Footer.propTypes = {
  children: P.node,
};
