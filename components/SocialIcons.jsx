import { LinkedinLogo, DribbbleLogo, StackOverflowLogo, XLogo } from '@phosphor-icons/react/ssr';
import { Tooltip } from './Tooltip';

/**
 * SocialIcons component for displaying Ricardo Zea's social media links
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes to apply to the container
 * @returns {JSX.Element} - Rendered component
 */
export default function SocialIcons({ className = '', withTooltips = false }) {
  const maybeWrap = (label, element) => {
    if (!withTooltips) return element;
    return (
      <Tooltip>
        <span>{label}</span>
        {element}
      </Tooltip>
    );
  };

  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      {/* LinkedIn */}
      {maybeWrap(
        'LinkedIn - Opens a new tab',
        <a href="https://linkedin.com/in/ricardozea" target="_blank" rel="noopener noreferrer" title="LinkedIn - Opens a new tab">
          <LinkedinLogo size={24} weight="regular" />
        </a>
      )}

      {/* Dribbble */}
      {maybeWrap(
        'Dribbble - Opens a new tab',
        <a href="https://dribbble.com/ricardozea" target="_blank" rel="noopener noreferrer" title="Dribbble - Opens a new tab">
          <DribbbleLogo size={24} weight="regular" />
        </a>
      )}

      {/* Codementor */}
      {maybeWrap(
        'Codementor - Opens a new tab',
        <a href="https://codementor.io/@ricardozea" target="_blank" rel="noopener noreferrer" title="Codementor - Opens a new tab">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <g clipPath="url(#codementor-clip)">
              <path fill="currentColor" d="M21.079 3.75c.77 0 1.394.633 1.394 1.412v12.882h1.413v.976c0 .619-.496 1.12-1.107 1.12H.991c-.61 0-1.106-.501-1.106-1.12v-.976h1.413V5.16c0-.779.624-1.411 1.394-1.411H21.08ZM2.709 18.043h7.058c0 .369.297.668.662.668h2.914c.174.002.34-.069.464-.193a.68.68 0 0 0 .196-.474h7.06V5.177H2.708v12.866Zm13.68-6.85c1.405.635 2.482 2.236 2.796 4.217a1.058 1.058 0 0 1-.23.839.999.999 0 0 1-.775.364h-6.272a.998.998 0 0 1-.775-.363 1.044 1.044 0 0 1-.23-.839c.315-1.983 1.391-3.583 2.796-4.218a2.725 2.725 0 0 0 2.69 0Zm-8.016 3.7a.71.71 0 0 1 .65.99.72.72 0 0 1-.382.387.69.69 0 0 1-.27.053H5.517a.69.69 0 0 1-.498-.208.72.72 0 0 1-.208-.507c0-.394.317-.714.706-.714h2.857Zm.688-2.647a.711.711 0 0 1 .652.99.72.72 0 0 1-.382.387.691.691 0 0 1-.27.053H5.533a.691.691 0 0 1-.498-.208.72.72 0 0 1-.208-.507.71.71 0 0 1 .706-.715h3.528ZM7.685 9.6h2.788c.39 0 .707.32.707.714a.73.73 0 0 1-.208.507.704.704 0 0 1-.499.21H6.944l-.035-.003H5.532a.69.69 0 0 1-.499-.208.722.722 0 0 1-.208-.507c0-.394.317-.714.707-.714h2.153Zm7.36-3.03a2.087 2.087 0 0 1 1.493.624c.397.402.621.949.624 1.52a2.194 2.194 0 0 1-.164.823c-.107.26-.264.497-.46.696a2.07 2.07 0 0 1-1.493.624 2.072 2.072 0 0 1-1.494-.624 2.195 2.195 0 0 1-.625-1.52 2.197 2.197 0 0 1 .625-1.52c.196-.199.43-.356.686-.463.256-.106.53-.16.808-.16Zm-4.572.381a.711.711 0 0 1 .65.99.72.72 0 0 1-.382.386.69.69 0 0 1-.27.053H6.264l-.024.002-.706-.001a.691.691 0 0 1-.499-.207.719.719 0 0 1-.208-.507c0-.395.317-.715.707-.715h4.94Z" />
            </g>
            <defs>
              <clipPath id="codementor-clip">
                <path fill="currentColor" d="M0 0h24v24H0z" />
              </clipPath>
            </defs>
          </svg>
        </a>
      )}

      {/* CodePen */}
      {maybeWrap(
        'CodePen - Opens a new tab',
        <a href="https://codepen.io/ricardozea" target="_blank" rel="noopener noreferrer" title="CodePen - Opens a new tab">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 23 24">
            <g clipPath="url(#codepen-clip)">
              <path fill="currentColor" d="m2.712 8.326 7.764-5.367v4.79l-4.257 2.963-3.507-2.386ZM6.26 10.74h-.08l.04-.028.04.028ZM4.352 12l-2.48 1.725v-3.451L4.353 12Zm6.204 4.2h-.08v4.842l-7.764-5.387L6.26 13.21l4.296 2.99Zm.944-6.606L14.958 12 11.5 14.408 8.042 12 11.5 9.594Zm0 14.405a.96.96 0 0 0 .503-.172l10.538-7.314c.007-.003.012-.009.017-.012l.045-.035a.81.81 0 0 0 .055-.049l.04-.04a1.308 1.308 0 0 0 .083-.1.969.969 0 0 0 .042-.063l.029-.048c.011-.022.023-.045.033-.068l.022-.05c.01-.026.017-.05.026-.077l.015-.05c.007-.028.012-.057.017-.086.001-.006.017-.013.035-.02v-7.63c-.017-.007-.032-.014-.034-.02a1.45 1.45 0 0 0-.017-.087c-.004-.017-.01-.033-.015-.05l-.025-.075-.023-.05a1.918 1.918 0 0 0-.033-.07l-.029-.047c-.013-.022-.027-.041-.042-.062l-.034-.044c-.015-.02-.032-.037-.049-.056l-.04-.04c-.017-.018-.036-.034-.055-.05l-.045-.035c-.005-.004-.01-.01-.017-.012L12.005.173A.964.964 0 0 0 11.5.001a.964.964 0 0 0-.504.172L.457 7.487l-.016.012-.045.035c-.019.016-.038.032-.056.05l-.04.04c-.016.019-.033.036-.048.056l-.034.044c-.015.02-.03.04-.042.062l-.029.048-.033.069-.023.05c-.01.025-.017.05-.025.075-.004.017-.01.033-.015.05a1.441 1.441 0 0 0-.018.087c0 .006-.016.013-.033.02v7.63c.018.007.034.014.035.02.005.029.01.058.017.086.004.017.01.033.015.05l.025.076.023.05c.01.024.022.047.033.07l.03.047a.848.848 0 0 0 .076.107c.015.02.031.038.048.056l.04.04a.824 0 0 0 .055.049l.045.035c.005.003.01.009.017.012l10.538 7.314a.96.96 0 0 0 .503.172Zm5.28-13.287L12.525 7.75V2.959l7.764 5.367-3.507 2.386Zm.04.028h-.08l.04-.028.04.028ZM18.648 12l2.48-1.726v3.45L18.647 12Zm-6.204 4.2 4.296-2.99 3.548 2.445-7.764 5.388V16.2h-.08Z" />
            </g>
            <defs>
              <clipPath id="codepen-clip">
                <path fill="currentColor" d="M0 0h23v24H0z" />
              </clipPath>
            </defs>
          </svg>
        </a>
      )}

      {/* StackOverflow */}
      {maybeWrap(
        'StackOverflow - Opens a new tab',
        <a href="https://stackoverflow.com/users/321555/ricardo-zea" target="_blank" rel="noopener noreferrer" title="StackOverflow - Opens a new tab">
          <StackOverflowLogo size={24} weight="regular" />
        </a>
      )}

      {/* Twitter/X */}
      {maybeWrap(
        'X - Opens a new tab',
        <a href="https://twitter.com/ricardozea" target="_blank" rel="noopener noreferrer" title="X - Opens a new tab">
          <XLogo size={24} weight="regular" />
        </a>
      )}
    </div>
  );
}
