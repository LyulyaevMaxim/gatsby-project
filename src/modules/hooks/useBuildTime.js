import { useStaticQuery, graphql } from 'gatsby'

export const useBuildTime = () =>
  useStaticQuery(graphql`
    query Info {
      site {
        buildTime(formatString: "DD/MM/YYYY")
      }
    }
  `).site.buildTime
