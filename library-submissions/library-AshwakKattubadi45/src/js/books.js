const booksCSVData = `Name,Published Year,Genre,Author
Sherlock Holmes. Selected Stories,2014-04,Fiction,Arthur Conan Doyle
The Complete Sherlock Holmes,2014-05-28,Fiction,Arthur Conan Doyle
Sherlock Holmes,1976,English drama,Arthur Conan Doyle| William Gillette
Adventures of Sherlock Holmes,2006,N/A,Arthur Conan Doyle
The Return of Sherlock Holmes,2018-10-17,Fiction,Arthur Conan Doyle
Who Is Sherlock?,2016-06-21,Literary Criticism,Lynnette Porter
The Memoirs of Sherlock Holmes,2014-04-22,Fiction,Arthur Conan Doyle
The Case Book of Sherlock Holmes,1993,Fiction,Sir Arthur Conan Doyle
The Adventures of Sherlock Holmes,2022-11-13,Fiction,Arthur Conan Doyle
The Sherlock Holmes Book,2015-10-20,Literary Criticism,DK
The Works of Oliver Wendell Holmes,1892,N/A,Oliver Wendell Holmes
Sherlock Holmes Handbook,2009-09-28,Reference,Christopher Redmond
The Adventures of Sherlock Holmes,2023-02-22,Language Arts & Disciplines,Sir Arthur Conan Doyle
The Outstanding Mysteries of Sherlock Holmes,2011-11-25,Fiction,Gerard Kelly
The Return of Sherlock Holmes (Illustrated),2014-06-11,Fiction,Arthur Conan Doyle
The Casebook of Sherlock Holmes and His Last Bow,1995-09-06,Children's stories, English,Sir Arthur Conan Doyle| Arthur Conan Doyle
The Holmes Reader,1964,Biography & Autobiography,Oliver Wendell Holmes (Jr.)
Sherlock Holmes for the 21st Century,2012-08-08,Literary Criticism,Lynnette Porter
Sherlock Holmes,2010-01,Fiction,Arthur Conan Doyle
Sherlock Holmes and the Scarlet Thread of Murder,2015-10-05,Fiction,Luke Kuhns
The Philosophy of Sherlock Holmes,2012-09-12,Performing Arts,Philip Tallon| David Baggett
The MX Book of New Sherlock Holmes Stories - Part VII,2017-10-24,Fiction,David Marcum
Sherlock Holmes and the Skull of Death,2001,Detective and mystery stories, American,Robert E. McClellan
His Last Bow: An Epilogue of Sherlock Holmes,2016-03-03,Fiction,Sir Arthur Conan Doyle
Three Adventures of Sherlock Holmes,1987,Detective and mystery stories, English,Arthur Conan Doyle
Mycroft Holmes,2016-09-21,Juvenile Fiction,Kareem Abdul Jabbar & Anna
Historical Dictionary of Sherlock Holmes,2019-11-05,Literary Criticism,Neil McCaw
LIFE Sherlock Holmes,2017-01-09,Social Science,The Editors of LIFE
The Great Adventures of Sherlock Holmes,2013-12-16,Fiction,Donald Thomas
Memoirs of Sherlock Holmes,2018-01-28,N/A,Arthur Conan Doyle
The Adventures of Felicity Holmes,2016-10-24,Fiction,Jeffrey Baumgartner| Arthur Conan Doyle
Sherlock Holmes: The Complete Novels and Stories Volume I,2013-06-26,Fiction,Sir Arthur Conan Doyle
Sherlock Holmes : A Study in Scarlet,2013-10-01,Fiction,Sir Arthur Conan Doyle
The Return of Sherlock Holmes,1905,Detective and mystery stories, English,Arthur Conan Doyle
The Memoirs of Sherlock Holmes (100 Copy Collector's Edition),2019-12-03,N/A,Sir Arthur Conan Doyle| Sidney Paget
From Holmes to Sherlock,2017-08-01,Literary Criticism,Mattias Boström
Memoirs of Sherlock Holmes,2018-06-17,N/A,Arthur Conan Doyle
The Adventures and Memoirs of Sherlock Holmes,2001,Detective and mystery stories, English,Arthur Conan Doyle
Sherlock Holmes: The Six Napoleons,2022-07-01,Juvenile Fiction,Alex Woolf
Sherlock Holmes and the Adventure of the Blue Gem,2018-08-01,Juvenile Fiction,Sir Arthur Conan Doyle
The Adventures and Memoirs of Sherlock Holmes,2001,Detective and mystery stories, English,Arthur Conan Doyle
Sherlock Holmes: The Six Napoleons,2022-07-01,Juvenile Fiction,Alex Woolf
The Adventures of Sherlock Holmes Illustrated,2020-01-29,N/A,Sir Arthur Conan Doyle
The Return of Sherlock Holmes,2018-01-04,N/A,Arthur Conan Doyle
The Memoirs of Sherlock Holmes,2021-04-13,N/A,Sir Arthur Conan Doyle
The Adventures of Sherlock Holmes,2011-05-01,N/A,Arthur Conan Doyle
The Collected Papers of Sherlock Holmes - Volume 4,2022-05-18,Fiction,David Marcum
His Last Bow,1974,Fiction,Arthur Conan Doyle
The Complete Sherlock Holmes,1930,Fiction,Arthur Conan Doyle| Sir Arthur Conan Doyle
The Memoirs of Sherlock Holmes Illustrated,2021-06-25,N/A,Arthur Doyle
The Return of Sherlock Holmes,2017-05-25,Fiction,Sir Arthur Conan Doyle
Memoirs of Sherlock Holmes,2015-01-27,N/A,Arthur Conan Doyle, Sir
The Return of Sherlock Holmes,2018-11-10,N/A,Arthur Conan Doyle
The Adventures of Sherlock Holmes (1892), by Arthur Conan Doyle,2016-03-30,N/A,Arthur Conan Doyle
Adventures of Sherlock Holmes,2009-12,Fiction,Arthur Conan Doyle
Harry Holmes; Or, The True Story of a Sailor-boy,1875,N/A,H V. Holmes
Sherlock Holmes,2021-05-10,N/A,David Macgregor
The Scientific Sherlock Holmes: Cracking the Case with Science and Forensics,2012-12-03,Science,James O'Brien
A Study in Scarlet - The Sherlock Holmes Collector's Library,2013-04-26,Fiction,Arthur Conan Doyle
His Last Bow,2015-02-08,N/A,Arthur Conan Doyle, Sir
The Casebook of Sherlock Holmes,2015-11-13,N/A,Arthur Conan Doyle, Sir
The Essential Holmes,1992-04-01,Law,Oliver Wendell Holmes
The Redacted Sherlock Holmes - The Stage Plays,2021-05-04,Fiction,Orlando Pearson
In Unhallowed Rest,2017-11-30,Fiction,John Sutton
The Adventures of Sherlock Holmes Illustrated,2018-09-18,Fiction,Arthur Conan Doyle
Sherlock Holmes and the Lady in Black,2016,Detective and mystery stories,June Thomson
The Memoirs of Sherlock Holmes,2017-11-07,N/A,Arthur Conan Doyle
Sherlock Holmes - the Hound of the Baskervilles,2017-10-20,N/A,Arthur Conan Doyle, Sir
The Science of the Mind,2007-06-01,Self-Help,Ernest Holmes
The Yellow Face,2016-08-01,N/A,Sir Arthur Conan Doyle
Sherlock Holmes - a Study in Scarlet,2017-10-21,N/A,Arthur Conan Doyle
The Return of Sherlock Holmes,2020-12-31,N/A,Arthur Doyle
A Holmes Family,1970,N/A,Maurice Holmes
The Hound of the Baskervilles,2011-07-17,Fiction,Arthur Conan Doyle, Sir
On the Trail of Sherlock Holmes,2022-03-24,Travel,Stephen Browning
The Memoirs of Sherlock Holmes,2018-02-25,N/A,Arthur Conan Doyle
Law Without Values,2000-12,Biography & Autobiography,Albert W. Alschuler
Sherlock Holmes Series Complete Collection 7 Books Set by Arthur Conan Doyle (Return,Memories,Adventures,Valley of Fear and His Last Bow,Hound of Baskerville and Study in Scarlet and Sign of Four),2021-01-31,N/A,Arthur Conan Doyle
The Writings of Oliver Wendell Holmes,1893,American fiction,Oliver Wendell Holmes
The Collected Works of Justice Holmes,1995,Judicial opinions,Oliver Wendell Holmes (Jr.)
The Memoirs of Sherlock Holmes,2016-06-26,N/A,Arthur Conan Arthur Conan Doyle
The Casebook of Sherlock Holmes,2021-06-30,N/A,Sir Arthur Conan Doyle
Mycroft Holmes,2016-09-14,Fiction,Kareem Abdul-Jabbar| Anna Waterhouse| Benjamin Kuntzer
The Casebook of Sherlock Holmes Illustrated,2020-11-13,N/A,Arthur Doyle
Life and Letters of Oliver Wendell Holmes,1896,Authors, American,John Torrey Morse (Jr.)
Flying Solo,2022-06-14,Fiction,Linda Holmes
The Works of Oliver Wendell Holmes: Life and letters of Oliver Wendell Holmes,1896,N/A,Oliver Wendell Holmes
The Adventures of Sherlock Holmes,2020-08-04,N/A,Sir Arthur Conan Doyle
The Casebook of Sherlock Holmes : Annotated,2020-05-12,N/A,Arthur Conan Doyle
The Hound of the Baskervilles,2016-07-24,N/A,Arthur Conan Doyle
Evvie Drake Starts Over,2019-06-25,Fiction,Linda Holmes
Elementary Stories Sherlock Holmes Library the Boscombe Valley Mystery,2012-09-26,Fiction,Arthur Conan Doyle, Sir
Holmes Leaflets,2016-05-16,N/A,Oliver Wendell Holmes| Josephine E Hodgdon
The Memoirs of Sherlock Holmes (English German Edition, Illustrated),2018-11-09,N/A,Arthur Conan Doyle
Sherlock Holmes,2013-02-15,Fiction,Sir Arthur Conan Doyle
The Adventures of Sherlock Holmes Classic Edition,2021-05-13,N/A,Sir Arthur Conan Doyle
Holmes Leaflets; Poems and Prose Passages from the Works of Oliver Wendell Holmes for Reading and Recitation,2016-05-25,N/A,Oliver Wendell Holmes| Josephine E [From Old Catalog Hodgdon
Holmes-Pollock Letters,1942,Judges,Oliver Wendell Holmes
The Hound of the Baskervilles,2018-05-08,N/A,Arthur Conan Doyle
Casebook of Sherlock Holmes Illustrated,2020-09-16,N/A,Arthur Doyle
The Television Sherlock Holmes,1994,Fiction,Peter Haining
The Works of Oliver Wendell Holmes..,2016-05-02,N/A,Oliver Wendell Holmes
Adventures of Sherlock Holmes,2017-09,N/A,Arthur Conan Doyle
The Holmes Manual,2014-05-27,House & Home,Mike Holmes
The Return of Sherlock Holmes,2016-03-27,N/A,Arthur Conan Doyle, Sir
The Adventures of Sherlock Holmes,2016-10-27,N/A,Arthur Conan Arthur Conan Doyle
The Adventures of Sherlock Holmes,2019-04-06,N/A,Arthur Conan Doyle
The Adventure of the Beryl Coronet 1892,2015-01-22,Fiction,Arthur Conan Doyle
Nube mortale. Young Sherlock Holmes,2012-03-30T00:00:00+02:00,Juvenile Fiction,Andrew Lane
The Adventures of Sherlock Holmes Illustrated,2020-07-25,N/A,Sir Arthur Conan Doyle
The Adventures of Sherlock Holmes(Sherlock Holmes #9) Annotated,2021-09-30,N/A,Arthur Conan Doyle
The Adventures of Sherlock Holmes,2018-03-04,N/A,Arthur Conan Doyle
The Writings of Oliver Wendell Holmes,2016-05-25,N/A,Oliver Wendell Holmes
The Adventures of Sherlock Holmes by Arthur Conan Doyle,2017-12-04,N/A,Arthur Conan Doyle
Sherlock Holmes,2013-08-20,Fiction,Mark Twain
The Return of Sherlock Holmes,2018-09-05,N/A,Arthur DOYLE
The Adventures of Sherlock Holmes,2017-12-10,N/A,Arthur Conan Doyle
The Professor at the Breakfast-Table (by O.W. Holmes),2015-11-15,N/A,Oliver Wendell Holmes
The Entire Project Gutenberg Collection of Oliver Wendell Holmes Volume 1,2018-08-15,N/A,Oliver Wendell Holmes, Sr.
The Entire Project Gutenberg Collection of Oliver Wendell Holmes Volume 1,2018-08-15,N/A,Oliver Wendell Holmes, Sr.
Sherlock Holmes and the Nine-Dragon Sigil,2016-11-07,Fiction,Tim Symonds
Strange Case of Dr. H.h. Holmes,2016-02-23,N/A,John Borowski
Le mariage de Figaro ou La folle journée, mise en scène de Joël Dragutin,1998,N/A,N/A
Holmes-Pollock Letters,1961,Judges,Oliver Wendell Holmes| Frederick Pollock
The Adventures of Sherlock Holmes Sherlock Holmes #9,2021-01-10,N/A,Arthur Conan Doyle
His Last Bow,2019-04-09,N/A,Arthur Conan Doyle
The Guardian Angel,2014-03,N/A,Oliver Wendell Holmes, Sr.
His Last Bow,2019-09-25,N/A,Arthur Conan Doyle
The Adventures of Sherlock Holmes Illustrated,2020-10-14,N/A,Sir Arthur Conan Doyle
Sherlock Holmes,2010-02-05,Detective and mystery stories,David Stuart Davies
The Complete Writings of Oliver Wendell Holmes: A mortal antipathy,1892,N/A,Oliver Wendell Holmes
The Writings of Oliver Wendell Holmes, Volume 3,2016-05-23,N/A,Oliver Wendell Holmes
The Sherlock Holmes Connection,2015,Detective and mystery stories,Martin Widmark| Anushka Ravishankar| Katarina Genar| Bikram Ghosh
Sherlock Holmes's London,2015-10-08,Reference,Rose Shepherd
The Holmes Safety Association Handbook,1976,Mine safety,Holmes Safety Association
Trading in the Footsteps of Sherlock Holmes,2011,Business & Economics,Anthony Trongone
The Valley of Fear,2017-08-17,N/A,Arthur Conan Doyle
The Writings of Oliver Wendell Holmes, Volume 2,2016-05-20,N/A,Oliver Wendell Holmes
Sherlock Holmes and the Cryptic Clues,2020-02,N/A,Michael W. McClure
Selections from the Writings of Oliver Wendell Holmes,2017-09-06,N/A,Oliver Wendell Holmes
Chronicles of Sherlock Holmes,2014-07-09,Fiction,David B. Beckwith
LIFE & LETTERS OF OLIVER WENDE,2016-08-27,History,John Torrey 1840-1937 Morse| Oliver Wendell 1809-1894 Holmes
Dr. Holmes's Boston,2008-02,Fiction,Oliver Wendell Holmes
The Writings of Oliver Wendell Holmes, Volume 12,2016-05-19,N/A,Oliver Wendell Holmes
Mismatch,2018-10-16,Technology & Engineering,Kat Holmes
The Writings of Oliver Wendell Holmes, Volume 9,2015-12-08,N/A,Oliver Wendell Holmes
The poetical works of Oliver Wendell Holmes. 1893,1891,Authors, American,Oliver Wendell Holmes
The Writings of Oliver Wendell Holmes: The autocrat of the breakfast table,1891,N/A,Oliver Wendell Holmes
The Complete Writings of Oliver Wendell Holmes: One hundred days in Europe,1892,N/A,Oliver Wendell Holmes
The Original Sherlock Holmes,2015-06-23,Fiction,Arthur. Conan Doyle
The Return of Sherlock Holmes,1993,Detective and mystery stories,Arthur Conan Doyle
Mastermind,2013-01-03,Psychology,Maria Konnikova
The Writings of Oliver Wendell Holmes, Volume 13,2016-05-18,N/A,Oliver Wendell Holmes
Sherlock Holmes Case-Book of Curious Puzzles,2021-03-15,N/A,Gareth Moore
Sherlock Holmes: The Outstanding Mysteries,2014-09-25,Fiction,Gerard Kelly
Sherlock Holmes's School for Detection,2017-04-06,Fiction,Simon Clark
Sherlock Holmes on the Stage,2008-06-10,Performing Arts,Amnon Kabatchnik
The London of Sherlock Holmes,1972,Literary Criticism,Michael Harrison
The Writings of Oliver Wendell Holmes, Volume 5,2016-05-22,N/A,Oliver Wendell Holmes
The MX Book of New Sherlock Holmes Stories - Part IX,2018-04-17,Fiction,David Marcum
The MX Book of New Sherlock Holmes Stories Part I,2017-03-21,Fiction,David Marcum
The Best Sherlock Holmes Short Stories,N/A,Fiction,Doyle А.С.
A Few Lessons from Sherlock Holmes,2013-08-12,Fiction,Peter Bevelin
Bulletin - Holmes Safety Association,1983,N/A,Holmes Safety Association
Sherlock Holmes and the Case of the Perplexed Politician,2020-04-02,Fiction,Margaret Walsh
The Hound of the Baskervilles(Sherlock Holmes #3) Illustrated,2021-07-18,N/A,Arthur Doyle
Sherlock Holmes and the Cornwall Affair,2020-06-15,Fiction,Johanna Rieke
The MX Book of New Sherlock Holmes Stories - Part XVI,2019-11-25,Fiction,David Marcum
The Case-Book of Sherlock Holmes (Illustrated),2023-01-01,Fiction,Arthur Conan Doyle
... The Works of Oliver Wendell Holmes ...: A moral antipathy,1892,N/A,Oliver Wendell Holmes
The New Annotated Sherlock Holmes: The Complete Short Stories: The Adventures of Sherlock Holmes and The Memoirs of Sherlock Holmes (Non-Slipcased Edition) (Vol. 1) (The Annotated Books),2005,Fiction,Arthur Conan Doyle
Superior National Forest (N.F.), Holmes/Chipmunk Timber Sale,2003,N/A,N/A
The Secret Notebooks of Sherlock Holmes,2012-07-30,Fiction,June Thomson
COLLECTOR'S EDITION – COMPLETE RAFFLES SERIES & SHERLOCK HOLMES ADVENTURES,2023-12-09,Fiction,Arthur Conan Doyle| John Kendrick Bangs| E. W. Hornung
Sherlock Holmes and the Case of the Bulgarian Codex,2012-10-16,Fiction,Tim Symonds
The London of Sherlock Holmes,1972,Literary Criticism,Michael Harrison
Oliver Wendell Holmes,1893,Authors, American,Walter Jerrold
May We Show You?,1910,Beds,Holmes Disappearing Bed Co. (Los Angeles, Calif.)
The Works of Oliver Wendell Holmes ...,1892,N/A,Oliver Wendell Holmes
A Study in Scarlet: Sherlock Holmes,2010-01-15,N/A,Arthur Conan Doyle| Sherlock Holmes
The Poetical Works of Oliver Wendell Holmes,1893,N/A,Oliver Wendell Holmes
Poems of Oliver Wendell Holmes,1880,N/A,Oliver Wendell Holmes
The Writings of Oliver Wendell Holmes,1891,N/A,Oliver Wendell Holmes
The Writings of Oliver Wendell Holmes: Our hundred days in Europe. 1895,1895,N/A,Oliver Wendell Holmes
Poetical works,1892,N/A,Oliver Wendell Holmes
Selections from the Writings of Oliver Wendell Holmes,1889,Calendars,Oliver Wendell Holmes
Representative Opinions of Mr. Justice Holmes,1971,Judicial opinions,Oliver Wendell Holmes (Jr.)
The Poetical Works of Oliver Wendell Holmes in Three Volumes,1891,N/A,Oliver Wendell Holmes
Holmes-Sheehan Correspondence,1976,Biography & Autobiography,Oliver Wendell Holmes (Jr.)| Patrick Augustine Sheehan
Extraordinary Cases of Sherlock Holmes,1995-06-01,Juvenile Fiction,Arthur Conan Doyle, Sir
HRH,2020-11-17,Biography & Autobiography,Elizabeth Holmes
Enola Holmes: The Case of the Missing Marquess,2007-11-08,Juvenile Fiction,Nancy Springer
365 Science of Mind,2007-12-27,Philosophy,Ernest Holmes
Mycroft Holmes,2015-09-25,Fiction,Kareem Abdul-Jabbar| Anna Waterhouse
The Adventures of Sherlock Holmes,2020-05-31,N/A,A. B. Press| Arthur Conan Doyle
Holmes Leaflets,1905,N/A,Oliver Wendell Holmes
The Poetical Works of Oliver Wendell Holmes,2016-01-16,N/A,Oliver Wendell Holmes
The Fundamental Holmes,2010,Freedom of expression,Oliver Wendell Holmes (Jr.)
Holmes of Kyoto: Volume 5,2021-05-27,Young Adult Fiction,Mai Mochizuki
The Final Adventures of Sherlock Holmes,2014-02-06,Fiction,Arthur Conan Doyle| Peter Haining`;

let libraryRenderer;

const main = async () => {
    load(booksCSVData);
    render();
    await loading();
    loader.style.display = 'none';
};

window.onload = main;