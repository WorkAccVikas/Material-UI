import { Typography } from "@mui/material";

const MuiTypography = () => {
  return (
    <div>
      {/* h1 - h6 */}
      <Typography variant="h1">h1 Heading</Typography>
      <Typography variant="h2">h2 Heading</Typography>
      <Typography variant="h3">h3 Heading</Typography>
      <Typography variant="h4">h4 Heading</Typography>
      {/* DESC : gutterBottom : 
            gutterBottom means margin-bottom is different for each heading
            font-size * 16 * margin-bottom (em)
            answer show on inspect window in Layout tab
            */}
      <Typography variant="h4" gutterBottom>
        h4 Heading (with gutter)
      </Typography>
      <Typography variant="h5">h5 Heading</Typography>
      <Typography variant="h6">h6 Heading</Typography>

      {/* h6 different variation */}
      <Typography variant="subtitle1">Subtitle 1</Typography>
      <Typography variant="subtitle2">Subtitle 2</Typography>

      {/* p tag */}
      {/* variant default = body1 */}
      <Typography>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur
        reprehenderit libero autem quae inventore minima nemo iusto velit,
        obcaecati, ullam delectus nihil. Praesentium tempora iste id porro omnis
        laudantium laborum.
      </Typography>
      <Typography variant="body1">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur
        reprehenderit libero autem quae inventore minima nemo iusto velit,
        obcaecati, ullam delectus nihil. Praesentium tempora iste id porro omnis
        laudantium laborum.
      </Typography>
      <Typography variant="body2">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur
        reprehenderit libero autem quae inventore minima nemo iusto velit,
        obcaecati, ullam delectus nihil. Praesentium tempora iste id porro omnis
        laudantium laborum.
      </Typography>

      {/* h1 tag but property of h4 Heading */}
      <Typography variant="h4" component="h1">
        h1 tag but property of h4 Heading
      </Typography>

      {/* span tag */}
      <Typography variant="caption">caption</Typography>

      {/* span tag with uppercase */}
      <Typography variant="button">button</Typography>

      {/* span tag */}
      <Typography variant="overline">overline</Typography>
    </div>
  );
};

export default MuiTypography;
