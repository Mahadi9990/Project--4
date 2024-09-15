import {Footer} from 'flowbite-react'
import { Link } from 'react-router-dom'
import {BsDribbble, BsFacebook, BsInstagram, BsTwitter, BsYoutube } from 'react-icons/bs'
export default function Fotter() {
  return (
    <Footer container className='border border-t-8 border-teal-500 mt-5'>
      <div className="w-full mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 w-full justify-between sm:flex">
        {/* grid w-full justify-between sm:flex md:grid-clos-2 */}
            <div className="py-3">
            <Link className='
          self-center whitespace-nowrap text-sm md:text-xl font-semibold dark:text-white
          '>
            <span className='py-1 px-2 rounded-lg text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 '>Shafayat</span>Blog
          </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mt-5">
          {/* grid grid-cols-2 gap-8 sm:grid-cols-3 mt-5 */}
            <div className="">
              <Footer.LinkGroup col>
                <Footer.Title title='About'/>
                <Footer.Link
                href='https://github.com/Mahadi9990/Mern-Blog-3/commit/881a60bf04d595e0702f58ad4fcd4b35fc5a45d0'
                target='_blank'
                rel='noopender noreferrer'
                >
                   project
                </Footer.Link>
                <Footer.Link
                href='https://github.com/Mahadi9990/Mern-Blog-3/commit/881a60bf04d595e0702f58ad4fcd4b35fc5a45d0'
                target='_blank'
                rel='noopender noreferrer'
                >
                  100 js
                </Footer.Link>
                <Footer.Link
                href='https://github.com/Mahadi9990/Mern-Blog-3/commit/881a60bf04d595e0702f58ad4fcd4b35fc5a45d0'
                target='_blank'
                rel='noopender noreferrer'
                >
                  100 js project
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div className="">
              <Footer.LinkGroup col>
                <Footer.Title title='About'/>
                <Footer.Link
                href='https://github.com/Mahadi9990/Mern-Blog-3/commit/881a60bf04d595e0702f58ad4fcd4b35fc5a45d0'
                target='_blank'
                rel='noopender noreferrer'
                >
                   project
                </Footer.Link>
                <Footer.Link
                href='https://github.com/Mahadi9990/Mern-Blog-3/commit/881a60bf04d595e0702f58ad4fcd4b35fc5a45d0'
                target='_blank'
                rel='noopender noreferrer'
                >
                  100 js
                </Footer.Link>
                <Footer.Link
                href='https://github.com/Mahadi9990/Mern-Blog-3/commit/881a60bf04d595e0702f58ad4fcd4b35fc5a45d0'
                target='_blank'
                rel='noopender noreferrer'
                >
                  100 js project
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div className="">
              <Footer.LinkGroup col>
                <Footer.Title title='About'/>
                <Footer.Link
                href='https://github.com/Mahadi9990/Mern-Blog-3/commit/881a60bf04d595e0702f58ad4fcd4b35fc5a45d0'
                target='_blank'
                rel='noopender noreferrer'
                >
                   project
                </Footer.Link>
                <Footer.Link
                href='https://github.com/Mahadi9990/Mern-Blog-3/commit/881a60bf04d595e0702f58ad4fcd4b35fc5a45d0'
                target='_blank'
                rel='noopender noreferrer'
                >
                  100 js
                </Footer.Link>
                <Footer.Link
                href='https://github.com/Mahadi9990/Mern-Blog-3/commit/881a60bf04d595e0702f58ad4fcd4b35fc5a45d0'
                target='_blank'
                rel='noopender noreferrer'
                >
                  100 js project
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider/>
        <div className="sm:flex justify-between items-start">
          <div className="">
            <Footer.Copyright
            href='#'
            by='shafayat Blog'
            year={new Date().getFullYear()}
            />
          </div>
          <div className="flex justify-start items-start gap-2 mt-3">
            <Footer.Icon target='_blank' rel='noopender noreferrer' href='https://github.com/Mahadi9990' icon={BsDribbble}/>
            <Footer.Icon icon={BsFacebook}/>
            <Footer.Icon icon={BsInstagram}/>
            <Footer.Icon icon={BsTwitter}/>
            <Footer.Icon icon={BsYoutube}/>
          </div>
        </div>
      </div>
    </Footer>
  )
}
