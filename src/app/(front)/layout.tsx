"use client";

import "@/front-ui/assets/globals.css";
import LogoDarkText from "@/front-ui/assets/images/logo-dark-text-jeremys-portfolio.svg";
import LogoLightText from "@/front-ui/assets/images/logo-Light-text-jeremys-portfolio.svg";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [primaryNavExpanded, setPrimaryNavExpanded] = useState(false);

    return (
        <div
            className="
            grid [grid-template-areas:'main''footer''header'] grid-rows-[1fr_auto_auto] min-h-dvh w-full md:[grid-template-areas:'header''main''footer'] md:grid-rows-[auto_1fr_auto]
            bg-gray-100 text-gray-950 dark:bg-gray-900 dark:text-gray-50
            before:fixed before:z-40 before:inset-2 before:pointer-events-none before:rounded-t-md before:rounded-b-xl before:shadow-[0_0_0_1rem] md:before:rounded-t-xl md:before:rounded-b-lg
            before:shadow-gray-100 dark:before:shadow-gray-900
            "
        >
            <header
                className="
                [grid-area:header] sticky z-50 bottom-0 md:top-0 md:bottom-auto p-2 
                "
            >
                <div
                    className="
                    backdrop-blur-[6px] bg-opacity-70 rounded-lg shadow-[0_0_3px_0_rgb(0_0_0/0.25)] dark:bg-opacity-70
                    bg-gray-900 text-gray-50 dark:bg-gray-100 dark:text-gray-950
                    "
                >
                    <div
                        className="
                        grid [grid-template-areas:'primaryNav_primaryNav''headerLogo_primaryNavButton'] grid-cols-[auto_auto] justify-between items-center md:[grid-template-areas:'headerLogo_primaryNav']
                        max-w-screen-xl min-h-12 p-2 mx-auto md:min-h-[none] md:h-16
                        "
                    >
                        <Link
                            href="/"
                            title=""
                            className="[grid-area:headerLogo] h-8 md:h-full md:py-0.5"
                        >
                            <Image
                                src={LogoLightText}
                                alt=""
                                height={80}
                                loading="eager"
                                className="h-full w-auto block dark:hidden"
                            />
                            <Image
                                src={LogoDarkText}
                                alt=""
                                height={80}
                                loading="eager"
                                className="h-full w-auto hidden dark:block"
                            />
                        </Link>

                        <button
                            className="
                            [grid-area:primaryNavButton] relative peer w-5 h-5
                            before:absolute before:top-1/2 before:left-1/2 before:-translate-y-1.5 before:-translate-x-1/2 before:w-full before:h-0.5 before:transition-transform
                            after:absolute after:top-1/2 after:left-1/2 after:translate-y-1.5 after:-translate-x-1/2 after:w-full after:h-0.5 after:transition-transform
                            [&[aria-expanded=true]]:before:-translate-y-1/2 [&[aria-expanded=true]]:after:-translate-y-1/2 [&[aria-expanded=true]]:before:-rotate-45 [&[aria-expanded=true]]:after:rotate-45
                            before:bg-gray-50 dark:before:bg-gray-950 after:bg-gray-50 dark:after:bg-gray-950
                            md:hidden
                            "
                            aria-controls="primaryNav"
                            aria-expanded={primaryNavExpanded}
                            type="button"
                            onClick={() =>
                                setPrimaryNavExpanded(!primaryNavExpanded)
                            }
                        >
                            <span className="sr-only">Primary Navigation</span>
                        </button>

                        <nav
                            id="primaryNav"
                            className="
                            [grid-area:primaryNav] pb-3 peer-[[aria-expanded='false']]:hidden md:pb-0 md:peer-[[aria-expanded='false']]:block
                            "
                        >
                            <ul
                                className="
                                grid gap-2 md:flex
                                pb-3 border-b md:pb-0 md:border-b-0
                                border-gray-700 dark:border-opacity-50 font-semibold
                                "
                            >
                                <li>
                                    <Link
                                        href="/"
                                        title=""
                                        className="
                                        block px-4 py-3 leading-none rounded transition-colors
                                        bg-indigo-300 text-gray-950 dark:bg-indigo-700 dark:text-gray-50
                                        "
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/about"
                                        title=""
                                        className="
                                        block p-4 py-3 leading-none rounded transition-colors
                                        bg-gray-700 dark:bg-gray-300
                                        hover:bg-indigo-300 hover:text-gray-950 dark:hover:bg-indigo-700 dark:hover:text-gray-50
                                        "
                                    >
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/contact"
                                        title=""
                                        className="
                                        block p-4 py-3 leading-none rounded transition-colors
                                        bg-gray-700 dark:bg-gray-300
                                        hover:bg-indigo-300 hover:text-gray-950 dark:hover:bg-indigo-700 dark:hover:text-gray-50
                                        "
                                    >
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="[grid-area:main] justify-self-center max-w-screen-xl p-2 z-0">
                {children}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum,
                ex maxime ipsam recusandae, molestiae et quia dolores ad unde
                quasi dolore. Atque ipsum fuga praesentium perspiciatis fugit,
                autem inventore quos magnam doloremque maxime, quia earum optio!
                Neque rem harum illo? Excepturi quia eveniet reiciendis. Iure
                eum voluptatem velit, numquam quae, mollitia, similique quaerat
                modi qui ipsam et. Mollitia harum quisquam voluptatum tempore
                consequuntur culpa, facilis necessitatibus quas provident,
                reiciendis consequatur adipisci quos sint unde voluptas
                explicabo amet assumenda voluptate ipsam aut ex labore
                voluptatibus? Labore commodi quisquam id? Ipsum nihil sint
                porro. Optio minima eius numquam tempore non atque ducimus
                repudiandae doloremque saepe reprehenderit nisi, quod possimus
                pariatur ullam, beatae quam similique perferendis laboriosam?
                Natus magnam eveniet assumenda tempora beatae quod excepturi
                officia dolorum facere, exercitationem nesciunt cum repellendus
                voluptatum perspiciatis esse cupiditate enim optio totam earum
                quo. Odit, tempore iusto dolores velit a sint at adipisci
                explicabo illum, distinctio cupiditate laudantium expedita
                dolorum dolorem nulla magni hic maiores magnam asperiores quae
                ipsam sit veritatis vel? Deserunt, sit! Fugit vel odio at
                facilis consectetur, tenetur commodi laboriosam iure. Porro
                quidem, distinctio recusandae autem maiores excepturi natus sed?
                Itaque reprehenderit iste consectetur vero doloremque velit
                officiis similique reiciendis repellat minima cupiditate quos
                voluptatem ipsa hic fugit laudantium in eius, odit totam
                exercitationem? Laboriosam, laudantium quam provident veritatis
                porro vitae sint praesentium beatae suscipit nam ex, asperiores
                nisi? Ducimus sapiente earum quas voluptates non autem ullam
                voluptatibus. Quidem, itaque perspiciatis! Ratione commodi quae
                harum porro aliquam velit recusandae unde voluptas sapiente
                magnam, hic praesentium ea deleniti consequuntur culpa
                distinctio eveniet aperiam incidunt repellat nulla quibusdam.
                Magni earum, placeat officiis esse corrupti obcaecati.
                Cupiditate dolore quidem amet illum enim aut cumque iure odio,
                aliquam et, sapiente explicabo qui! Repudiandae alias
                accusantium dolorem debitis, illo doloremque, quaerat voluptate,
                unde nam corrupti deserunt reprehenderit atque cumque laborum
                hic numquam esse magni cupiditate corporis magnam. Eum eveniet
                porro molestiae tempore excepturi voluptatibus eius officiis
                hic. Perferendis, ducimus. Perspiciatis doloremque amet enim
                modi, voluptate provident, debitis dignissimos eum sequi aut
                iusto. Excepturi illo nobis, magnam placeat consectetur error
                soluta optio, numquam repellat earum modi iste! Enim velit
                repellat qui doloribus totam quibusdam explicabo sunt quasi est
                fuga distinctio animi consequatur voluptatum possimus deserunt
                corrupti quis, neque error vel accusantium obcaecati reiciendis?
                Tempora asperiores nostrum maxime? Error unde illo obcaecati
                assumenda, molestiae ducimus ut laudantium fugit saepe
                repellendus, tempore voluptatem? Doloremque praesentium ipsa
                delectus quos aliquam molestiae tempora, modi saepe cupiditate?
                In provident eaque ab reprehenderit beatae, asperiores
                accusantium repellat minus mollitia quo distinctio placeat ipsa,
                voluptas ipsum eos ducimus, impedit sunt iste laborum dolores
                necessitatibus reiciendis nesciunt. Minima sequi harum
                quibusdam, ratione pariatur suscipit molestiae quod, enim
                tenetur magnam doloremque, quas explicabo magni ut quo
                cupiditate deleniti fuga quae in eius? Ipsam facere nobis
                similique ratione, non voluptatum, est consectetur hic illum
                quos quasi sequi aut! Quis quo ut delectus vel necessitatibus
                sunt illo architecto vero iste quaerat et perspiciatis
                dignissimos nam doloribus asperiores pariatur a, impedit
                blanditiis cumque beatae at minus doloremque nisi mollitia? Quis
                recusandae laudantium quam, odit nemo cum aperiam ipsa adipisci
                culpa a molestias voluptate harum possimus exercitationem,
                repudiandae labore voluptas. Veniam ex perferendis possimus eos
                quidem reiciendis est excepturi rem voluptatibus ullam maiores
                autem, distinctio atque suscipit omnis doloremque, accusamus at.
                Corporis quae cupiditate reiciendis officiis dicta numquam nihil
                inventore ipsum nisi itaque aspernatur repellendus ut nulla
                dolorem dignissimos voluptates nam fugiat quaerat perspiciatis,
                eos voluptatum consequuntur minus! Quasi provident ex veniam
                incidunt fugit sequi alias delectus eos nesciunt cupiditate
                dolores saepe molestiae debitis tenetur hic inventore ullam, a
                ducimus nemo quis culpa tempora? Fugit ab dolores architecto,
                laborum quidem cum quos! Nisi, provident autem. Possimus
                similique, ea praesentium delectus officiis, voluptates quam hic
                inventore molestias recusandae porro iste maiores molestiae modi
                nostrum explicabo voluptatem placeat iure, accusantium eum.
                Corporis pariatur atque modi facilis ipsa molestiae iure
                repudiandae, nesciunt saepe animi aperiam a labore quo incidunt
                similique excepturi quos facere vitae esse commodi
                necessitatibus quidem quisquam unde? Maxime officia vero cum,
                deleniti commodi ipsum dolor reprehenderit eaque velit ipsam
                tempora libero quo, illo quibusdam hic laudantium cupiditate,
                animi eveniet! Dicta, reprehenderit ipsa id ea quia magnam
                dolore ratione itaque consequuntur accusantium voluptas
                perferendis, ex eligendi adipisci corporis aut veritatis
                perspiciatis? Voluptates laboriosam facere similique accusamus
                dolores corporis autem dicta nulla. Accusantium omnis optio quia
                facilis veritatis, vitae voluptatibus tempore! Laboriosam
                reiciendis illum velit dolore eum maiores quaerat nulla neque
                esse labore? Odio ut sed est neque doloribus magnam rem cumque
                itaque porro facere. Sequi quia totam ratione fugiat vel
                adipisci laboriosam voluptate nobis quos eveniet. In, tenetur
                mollitia expedita ut, qui ipsum perferendis cupiditate fuga
                dolorem illo corrupti minus magnam repellat quibusdam laudantium
                ullam dignissimos. Pariatur explicabo distinctio sit sequi illo
                quas doloribus, dolorum iure reprehenderit nisi unde iusto
                minima beatae? Suscipit quis officiis laborum ipsa unde ullam
                itaque natus necessitatibus ut distinctio, harum placeat atque
                quisquam fuga dicta libero qui, nulla minima aspernatur amet
                veritatis. Est esse totam soluta a quod provident facilis
                voluptatem adipisci facere nesciunt accusamus, amet eum sint
                perferendis placeat. Totam dolorum enim libero deserunt
                cupiditate voluptates quas. Ipsum perferendis odio hic beatae
                accusamus praesentium eveniet magni voluptatem consequuntur,
                modi est harum sit? Delectus fuga quam officiis aspernatur
                assumenda ut adipisci officia, suscipit nulla, quas voluptates
                magni sapiente, esse cupiditate rerum consequatur soluta illo
                doloremque asperiores maiores corporis recusandae quos? Hic
                necessitatibus libero fugiat molestias minus cum expedita
                ducimus ipsum, sapiente accusamus quod? Recusandae, temporibus
                sit. Ipsum omnis quidem molestias atque ex provident esse
                facilis sequi autem eos quo eligendi, hic rerum excepturi,
                praesentium nobis. Et ut ducimus labore quam commodi! Sit
                obcaecati iste voluptate ducimus eligendi vero vel provident
                itaque, soluta officiis nemo expedita tempora, deserunt neque?
                Facere, quisquam quidem magnam nihil ab iste ratione aspernatur
                eos fugit cum. Quo consequuntur facere reiciendis cupiditate
                temporibus saepe quos pariatur dolore distinctio quisquam
                delectus, blanditiis omnis eaque quam consequatur inventore.
                Molestiae reiciendis eius voluptatem, optio nostrum nemo labore
                qui esse deleniti assumenda temporibus, laboriosam saepe vitae.
                Nam libero distinctio, explicabo amet obcaecati ut laudantium
                dolorum quam. Quis, officiis esse!
            </main>

            <footer className="[grid-area:footer] p-2 z-0">Footer</footer>
        </div>
    );
}
